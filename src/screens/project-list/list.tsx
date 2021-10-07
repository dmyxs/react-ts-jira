import React from 'react'
import { User } from './search-panel'
import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { Pin } from 'component/pin'
import { useEditProject } from 'hooks/use-project'
import { Dropdown } from 'antd'
import { ButtonNoPadding } from 'component/lib'
import { Menu } from 'antd'

export interface Project {
    id: string,
    name: string,
    personId: string,
    pin: boolean,
    organization: string,
    created: number
}


// 组件属性透传到table
interface ListProps extends TableProps<Project> {
    users: User[];
    refresh?: () => void
    setProjectModalOpen: (isOpen: boolean) => void;
}

export const List = ({ users, ...props }: ListProps) => {
    const { mutate } = useEditProject()

    // 正常
    // const pinProject = (id: number，pin: boolean) => mutate({ id, pin })

    // 柯里化
    const pinProject = (id: string) => (pin: boolean) => mutate({ id, pin }).then(props.refresh)
    return (
        <Table
            rowKey={'id'}
            pagination={false}
            columns={[
                {
                    title: <Pin checked={true} disabled={true} />,
                    render(value, project) {
                        // 正常
                        // return <Pin checked={project.pin} onCheckedChange={pin => pinProject(project.id, pin)} />

                        // 柯里化
                        return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />
                    }
                },
                {
                    title: '名称',
                    sorter: (a, b) => a.name.localeCompare(b.name),
                    render(value, project) {
                        // return <Link to={String(project.id)}>{project.name}</Link> //reacr-router6.x
                        return <Link to={`/projects/${String(project.id)}`}>{project.name}</Link>
                    }
                },
                {
                    title: '部门',
                    dataIndex: 'organization',
                    sorter: (a, b) => a.name.localeCompare(b.name)
                },
                {
                    title: '负责人',
                    render(value, project) {
                        return <span>{users.find(user => user.id === project.personId)?.name || '未知'}</span>
                    }
                },
                {
                    title: '创建时间',
                    render(value, project) {
                        return <span>
                            {
                                project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'
                            }
                        </span>
                    }
                },
                {
                    render(value, project) {
                        return <Dropdown overlay={<Menu>
                            <Menu.Item key={'edit'}>
                                <ButtonNoPadding type={'link'} onClick={() => props.setProjectModalOpen(true)}>编辑</ButtonNoPadding>
                            </Menu.Item>
                            <Menu.Item key={'delete'}>
                                <ButtonNoPadding type={'link'} >删除</ButtonNoPadding>
                            </Menu.Item>
                        </Menu>}>
                            <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
                        </Dropdown>
                    }
                }
            ]} {...props} />
    )
}