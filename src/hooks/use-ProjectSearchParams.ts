import { useMemo } from 'react'
import { useUrlQueryParam } from './use-urlQueryParam'

export const useProjectSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    // return [
    //     useMemo({ ...param, personId: Number(param.personId) || undefined }, [param]),
    //     setParam
    // ] as const

    return []
}