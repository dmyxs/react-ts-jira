import React, { ReactNode, useCallback } from 'react'
import * as auth from 'utils/auth-provider'
import { User } from 'screens/project-list/search-panel'
import { http } from 'utils/http'
import { useMount, useAsync } from 'hooks'
import { FullPageErrorFallback, FullPageLoading } from 'component/lib'

export interface AuthForm {
    username: string,
    password: string
}

export const AppInitalUser = async () => {
    let user = null
    const token = auth.getToken()
    if (token) {
        const data = await http('me', { token })
        user = data.user
    }
    return user
}

const AuthContext = React.createContext<{
    user: User | null,
    register: (form: AuthForm) => Promise<void>,
    login: (form: AuthForm) => Promise<void>,
    logout: () => Promise<void>,
} | undefined>(undefined)

AuthContext.displayName = 'AuthContext'  //dev-tool使用


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { data: user, error, isLoading, isIdle, isError, setData: setUser, run } = useAsync<User | null>()

    const login = (form: AuthForm) => auth.login(form).then(setUser)
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => setUser(null))

    useMount(
        useCallback(() => {
            run(AppInitalUser());
        }, [run])
    )

    if (isIdle || isLoading) {
        return <FullPageLoading />
    }

    if (isError) {
        return <FullPageErrorFallback error={error} />
    }

    return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}


export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}
