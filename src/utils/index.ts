import { useEffect, useState } from "react"


export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const cleanObject = (object: any) => {
    const result = { ...object }
    Object.keys(result).forEach(key => {
        const value = object[key]
        if (isFalsy(value)) {
            delete result[key]
        }
    })
    return result
}


export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export const useDebounce = <V>(value: V, deley?: number) => {
    const [debounceValue, setDebounceValue] = useState(value)
    //每次在value变化后，设置一个定时器
    useEffect(() => {
        const timeout = setTimeout(() => setDebounceValue(value), deley)
        //每次在上一次useEffect运行完之后执行
        return () => clearTimeout(timeout)
    }, [value, deley])

    return debounceValue
}