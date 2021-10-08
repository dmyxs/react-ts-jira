import React from 'react';
import { Popover, Typography, List } from 'antd';
import { useProject } from 'hooks';
import styled from '@emotion/styled'
import { Divider } from 'antd';
import { ButtonNoPadding } from './lib';


export const ProjectOpover = (props: { projectButton: JSX.Element }) => {
    const { data: projects, isLoading } = useProject()
    const pinnedProjects = projects?.filter(project => project.pin)

    const content = <ContentContainer>
        <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
        <List>
            {
                pinnedProjects?.map(project => <List.Item>
                    <List.Item.Meta title={project.name} />
                </List.Item>)
            }
        </List>
        <Divider />
        {props.projectButton}
        {/* <ButtonNoPadding type={'link'} onClick={() => props.setProjectModalOpen(true)}> 创建项目</ButtonNoPadding> */}
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