import React from 'react'
import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from "screens/project-list"

import styled from '@emotion/styled'
import { Dropdown, Menu, Button } from 'antd'

import { resetRouter } from 'utils'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Row } from 'component/lib'

export const AuthenticatedApp = () => {
    const { logout, user } = useAuth()
    return (
        <Container>
            <Header>
                <HeaderLeft gap={true}>
                    {/* 渲染svg的方法 */}
                    <Button type={'link'} onClick={resetRouter}>
                        <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255'} />
                    </Button>
                    <h3>项目</h3>
                    <h3>用户</h3>
                </HeaderLeft>

                <HeaderRight>
                    <Dropdown overlay={
                        <Menu>
                            <Menu.Item key={'logout'}>
                                <Button type={'link'} onClick={logout}>登出</Button>
                            </Menu.Item>
                        </Menu>}>
                        <Button type={'link'} onClick={e => e.preventDefault()}>Hi，{user?.name}</Button>
                    </Dropdown>
                </HeaderRight>
            </Header>
            <Main>
                <ProjectListScreen />
            </Main>
        </Container>

    )
}



const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr 6rem;
    height: 100vh;
`

const Header = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 3rem;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
    z-index: 1
`

const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const Main = styled.main``
