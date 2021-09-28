import { useState } from "react"
import LoginScreen from "./login"
import RegisterScreen from "./register"


export const UnAuthenticatedApp = () => {
    const [isResgiter, setIsRegister] = useState(false)


    return <div style={{ display: 'flex', justifyContent: 'center' }}>
        {
            isResgiter ? <RegisterScreen /> : <LoginScreen />
        }
        <button onClick={() => setIsRegister(!isResgiter)}>切换到{isResgiter ? '登录' : '注册'}</button>
    </div>

}

