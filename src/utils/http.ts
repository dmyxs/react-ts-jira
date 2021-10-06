import { useAuth } from 'context/auth-context';
import qs from 'qs'
import { useCallback } from 'react';
import * as auth from './auth-provider'

const apiUrl = process.env.REACT_APP_API_URL

// RequestInit fetch类型，但没有token和data，所以新建类型
interface Config extends RequestInit {
    token?: string,
    data?: object
}

export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {

    // 默认是GET请求，customConfig：用户可以设置为POST请求
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : '',
        },
        ...customConfig

    }

    // 请求参数处理
    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }

    return window.fetch(`${apiUrl}/${endpoint}`, config)
        .then(async response => {
            if (response.status === 401) {
                await auth.logout()
                window.location.reload()
                return Promise.reject({ message: '请重新登录' })
            }

            const data = await response.json()
            if (response.ok) {
                return data
            } else {
                return Promise.reject(data)
            }
        })
}


// 用于自动获取token的http请求，返回一个函数，因为使用到其他hook，所以也必须是hook
// Parameters<typeof http> 引用http的类型，因为是一样的类型
export const useHttp = () => {
    const { user } = useAuth()
    return useCallback((...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token }), [user?.token])
}