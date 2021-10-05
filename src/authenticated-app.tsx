import React, { memo } from 'react'
import { useAuth } from 'context/auth-context'
import styled from '@emotion/styled'
import { Dropdown, Menu, Button } from 'antd'
import { Row } from 'component/lib'
// import { Route, Routes, Navigate } from 'react-router'
// import { BrowserRouter as Router } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { ProjectScreen } from 'screens/project'
import { ProjectListScreen } from "screens/project-list"
import { resetRouter } from 'utils'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'


export const AuthenticatedApp = memo(() => {
    return (
        <Container>
            <PageHeader />
            <Main>
                {/* router5.0 */}
                <Router>
                    <Switch>
                        <Redirect exact from='/' to='/projects' />
                        <Route path={'/projects/:projectId'} component={ProjectScreen} />
                        <Route exact path={'/projects'} component={ProjectListScreen} />
                    </Switch>
                </Router>

                {/* router6.0 */}
                {/* <Router>
                    <Routes>
                        <Route path={'/projects'} element={<ProjectListScreen />} />
                        <Route path={'/projects/:projectId/*'} element={<ProjectScreen />} />
                        <Route path={'*'} element={<Navigate to={'/projects'} />} />
                    </Routes>
                </Router> */}
            </Main>
        </Container>
    )
})

const PageHeader = () => {
    const { logout, user } = useAuth()
    return (
        <Header>
            <HeaderLeft gap={true}>
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


