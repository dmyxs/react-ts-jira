// 状态处理
import { useState } from 'react';

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

    const setData = (data: D) => setState({
        data,
        stat: 'success',
        error: null
    })

    const setError = (error: Error) => setState({
        error,
        stat: 'error',
        data: null
    })

    // 用于触发异步请求
    const run = async (promise: Promise<D>) => {
        if (!promise || !promise.then) {
            throw new Error('请传入Promise类型数据')
        }
        setState({ ...state, stat: 'loading' })

        return promise.then(data => {
            setData(data)
            return data
        }).catch(error => {
            setError(error)
            return Promise.reject(error)
        })
    }

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        ...state
    }
}