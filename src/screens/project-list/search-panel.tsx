import React from 'react'
import { Form, Input, Select } from 'antd'


export interface User {
    id: string,
    name: string,
    email: string,
    title: string,
    organization: string,
    token: string
}

interface SearchPanelProps {
    users: User[],
    param: {
        name: string,
        personId: string,
    },
    // param: Partial<Pick<Project, 'name' | 'personId'>>,
    setParam: (param: SearchPanelProps['param']) => void;
}


export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
    return (
        <Form style={{ margin: '2rem 0' }} layout={'inline'}>
            <Form.Item>
                <Input
                    placeholder={'项目名称'}
                    type="text"
                    value={param.name}
                    onChange={e => setParam({
                        ...param,
                        name: e.target.value
                    })} />
            </Form.Item>

            <Form.Item>
                <Select value={param.personId} onChange={value => setParam({
                    ...param,
                    personId: value
                })}>
                    <Select.Option value={''}>负责人</Select.Option>
                    {
                        users.map((user) => <Select.Option key={user.id} value={String(user.id)}>{user.name}</Select.Option>)
                    }
                </Select>
            </Form.Item>
        </Form>
    )
}