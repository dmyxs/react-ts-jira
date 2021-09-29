import { useEffect } from 'react';
import { User } from "screens/project-list/search-panel";
import { useAsync } from 'hooks/use-async';
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';

export const useUsers = (param?: Partial<User>) => {
    const client = useHttp()

    // 将loading等信息封装
    const { run, ...result } = useAsync<User[]>()

    useEffect(() => {
        run(client('users', { data: cleanObject(param || {}) }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])

    return result
}