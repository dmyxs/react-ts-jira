import { useEffect, useState } from "react"


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