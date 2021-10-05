// import { useSearchParams } from 'react-router-dom'

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    // const [searchParams, setSearchParams] = useSearchParams()
    // return [
    //     keys.reduce((prev: K, key: K) => {
    //         return { ...prev, [key]: searchParams.get(key) || '' }
    //     }, {} as { [key in K]: string }),
    //     setSearchParams
    // ] as const

    return []
}

// as const 的作用是返回最原始的对象，TS的坑
// const a = ['jack', 12, { gender: 'male' }] as const