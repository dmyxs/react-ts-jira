import React, { useState, useEffect } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import qs from 'qs'
import { cleanObject, useMount, useDebounce } from 'utils';

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
    const [users, setUsers] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })

    const deboucedParam = useDebounce(param, 500)
    const [list, setList] = useState([])

    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(deboucedParam))}`).then(async response => {
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [deboucedParam])


    useMount(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    })

    console.log('hello');
    return (
        <div>
            <SearchPanel users={users} param={param} setParam={setParam} />
            <List list={list} users={users} />
        </div>
    );
}

