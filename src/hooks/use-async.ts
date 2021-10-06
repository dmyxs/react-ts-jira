// 状态处理
import { useCallback, useState } from 'react';
import { useMountedRef } from 'hooks';

interface State<D> {
    error: Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success';
}

// 默认的state
const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}

// 用户传入的State
export const useAsync = <D>(initialState?: State<D>) => {
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })
    // useState惰性初始化，函数会立即执行
    // const [retry, setRetry] = useState(() => { })
    // 避免惰性初始化，再嵌套一层
    const [retry, setRetry] = useState(() => () => { })

    const setData = useCallback((data: D) => setState({
        data,
        stat: 'success',
        error: null
    }), [])

    const setError = useCallback((error: Error) => setState({
        error,
        stat: 'error',
        data: null
    }), [])

    const mountedRef = useMountedRef()

    // 用于触发异步请求
    const run = useCallback(async (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
        if (!promise || !promise.then) {
            throw new Error('请传入Promise类型数据')
        }

        //保存状态，用于重新刷新一次
        setRetry(() => () => {
            if (runConfig?.retry) {
                run(runConfig?.retry(), runConfig)
            }
        })


        // setState({ ...state, stat: 'loading' })

        // 避免无限循环
        setState(prevState => ({ ...prevState, stat: 'loading' }))
        try {
            const data = await promise;
            // 阻止在已经卸载的组件上赋值
            if (mountedRef.current) {
                setData(data);
            }
            return data;
        } catch (error) {
            // setError(error);
            return await Promise.reject(error);
        }

    }, [mountedRef, setData])


    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        retry,
        ...state
    }
}