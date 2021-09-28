import React, { FormEvent } from 'react'
import { useAuth } from 'context/auth-context'


const RegisterScreen = () => {
    const { register } = useAuth()

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const username = (e.currentTarget.elements[0] as HTMLInputElement).value
        const password = (e.currentTarget.elements[1] as HTMLInputElement).value
        register({ username, password })
    }

    return <form onSubmit={handleLogin}>
        <label htmlFor='username'>用户名</label>
        <input type="text" id={'username'} />
        <label htmlFor='password'>密码</label>
        <input type="password" id={'password'} />
        <button type="submit">注册</button>
    </form>
}


export default RegisterScreen