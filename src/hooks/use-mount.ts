import { useEffect, useRef } from "react"


export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
    }, [callback])
}


// 监听页面是否卸载
export const useMountedRef = () => {
    const mountedRef = useRef(false)

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    })

    return mountedRef
}