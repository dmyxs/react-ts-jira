import { useEffect } from 'react';
import { Project } from 'screens/project-list/list';
import { useAsync } from 'hooks/use-async';
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';

export const useProject = (param?: Partial<Project>) => {
    const client = useHttp()
    const { run, ...result } = useAsync<Project[]>()

    const fetchProject = () => client('projects', { data: cleanObject(param || {}) })

    useEffect(() => {
        run(fetchProject(), {
            retry: fetchProject
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])

    return result
}


export const useEditProject = () => {
    const { run, ...rest } = useAsync()
    const client = useHttp()
    const mutate = (params: Partial<Project>) => {
        return run(client(`projects/${params.id}`, {
            data: params,
            method: 'PATCH'
        }))
    }

    return {
        mutate,
        rest
    }
}


export const useAddProject = () => {
    const { run, ...rest } = useAsync()
    const client = useHttp()
    const mutate = (params: Partial<Project>) => {
        return run(client(`projects/${params.id}`, {
            data: params,
            method: 'POST'
        }))
    }

    return {
        mutate,
        rest
    }
}