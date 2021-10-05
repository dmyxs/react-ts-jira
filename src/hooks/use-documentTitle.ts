import { useRef, useEffect } from "react"


// 版本一：最简单的写法
// export const useDocumentTitle = (title: string) => {
//     useEffect(() => {
//         document.title = title
//     }, [title])
// }


// 版本二：保留第一次的title
// isUnmount 是否卸载
export const useDocumentTitle = (title: string, isUnmount: boolean = true) => {
    const oldTitle = useRef(document.title).current
    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        return () => {
            if (!isUnmount) {
                document.title = oldTitle
            }
        }

    }, [oldTitle, isUnmount])
}

//闭包写法：实现保留第一次的title
// export const useDocumentTitle = (title: string, isUnmount: boolean = true) => {
//     const oldTitle = document.title
//     useEffect(() => {
//         document.title = title
//     }, [title])

//     useEffect(() => {
//         return () => {
//             if (!isUnmount) {
//                 document.title = oldTitle
//             }
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [])
// }
