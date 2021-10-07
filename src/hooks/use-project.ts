import { useCallback, useEffect } from 'react';
import { Project } from 'screens/project-list/list';
import { useAsync } from 'hooks';
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';

export const useProject = (param?: Partial<Project>) => {
    const client = useHttp()
    const { run, ...result } = useAsync<Project[]>()

    const fetchProject = useCallback(() => client('projects', { data: cleanObject(param || {}) }), [client, param])

    useEffect(() => {
        run(fetchProject(), {
            retry: fetchProject
        })
    }, [fetchProject, run])

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