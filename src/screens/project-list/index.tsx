import React, { useState, useEffect } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import { cleanObject, useMount, useDebounce } from 'utils';
import { useHttp } from 'utils/http';
import styled from '@emotion/styled';

export const ProjectListScreen = () => {
    const [users, setUsers] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })

    const deboucedParam = useDebounce(param, 500)
    const [list, setList] = useState([])
    const client = useHttp()

    useEffect(() => {
        client('projects', { data: cleanObject(deboucedParam) }).then(setList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deboucedParam])


    useMount(() => {
        client('users').then(setUsers)
    })

    console.log('hello');
    return (
        <Container>
            <SearchPanel users={users} param={param} setParam={setParam} />
            <List list={list} users={users} />
        </Container>
    );
}

const Container = styled.div`
    padding: 3.2rem;
`
