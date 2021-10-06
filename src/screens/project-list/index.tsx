import React, { useState, useEffect } from 'react';
import { SearchPanel } from './search-panel';
import { List, Project } from './list';
import { cleanObject } from 'utils';
import { useDebounce, useMount, useAsync, useProject, useUsers, useUrlQueryParam } from 'hooks'
import { useHttp } from 'utils/http';
import styled from '@emotion/styled';
import { Typography } from 'antd'


export const ProjectListScreen = () => {

    const [param, setParam] = useState({
        name: '',
        personId: ''
    })

    // project方案1:
    // const deboucedParam = useDebounce(param, 500)
    // const client = useHttp()
    // const { run, isLoading, error, data: list } = useAsync<Project[]>()

    // useEffect(() => {
    //     run(client('projects', { data: cleanObject(deboucedParam) }))
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [deboucedParam])


    // project方案2:封装到useProject
    const deboucedParam = useDebounce(param, 500)
    // const projectParam = { ...deboucedParam, personId: Number(deboucedParam.personId) || undefined }
    const { isLoading, error, data: list, retry } = useProject(deboucedParam)


    // users方案1:
    // const [users, setUsers] = useState([])
    // const client = useHttp()
    // useMount(() => {
    //     client('users').then(setUsers)
    // })

    // users方案2:采用封装
    const { data: users } = useUsers()

    console.log('hello');
    return (
        <Container>
            <h1>项目列表</h1>
            {error && <Typography.Text type={'danger'}>{error.message}</Typography.Text>}
            <SearchPanel users={users || []} param={param} setParam={setParam} />
            <List refresh={retry} loading={isLoading} dataSource={list || []} users={users || []} />
        </Container>
    );
}

ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
    padding: 3.2rem;
`
