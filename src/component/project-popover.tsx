import React from 'react';
import { Popover, Typography, List } from 'antd';
import { useProject } from 'hooks';
import styled from '@emotion/styled'
import { Divider } from 'antd';
import { ButtonNoPadding } from './lib';
import { useDispatch } from 'react-redux';
import { projectListActions } from 'store/project.slice'


export const ProjectOpover = () => {
    const { data: projects } = useProject()
    const pinnedProjects = projects?.filter(project => project.pin)
    const dispatch = useDispatch()

    const content = <ContentContainer>
        <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
        <List>
            {
                pinnedProjects?.map(project => <List.Item key={project.id}>
                    <List.Item.Meta title={project.name} />
                </List.Item>)
            }
        </List>
        <Divider />
        <ButtonNoPadding type={'link'} onClick={() => dispatch(projectListActions.openProjectModal())}> 创建项目</ButtonNoPadding>
    </ContentContainer>


    return (
        <Popover placement={'bottom'} content={content}>
            <span>项目</span>
        </Popover>
    );
}


const ContentContainer = styled.div`
  min-width: 20rem;
`;