import { useState } from "react"
import LoginScreen from "./login"
import RegisterScreen from "./register"
import styled from '@emotion/styled'
import { Card, Button, Divider } from 'antd'
import logo from 'assets/logo.svg'
import left from 'assets/left.svg'
import right from 'assets/right.svg'
import { Typography } from "antd"


export const UnAuthenticatedApp = () => {
    const [isResgiter, setIsRegister] = useState(false)
    const [error, setError] = useState<Error | null>(null)


    const onChangeButton = () => {
        setIsRegister(!isResgiter)
    }


    return (
        <Container>
            <Header />
            <Background />
            <ShadowCard>
                <Title>
                    {isResgiter ? '请注册' : '请登录'}
                </Title>
                {
                    error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null
                }
                {
                    isResgiter ? <RegisterScreen onError={setError} /> : <LoginScreen onError={setError} />
                }
                <Divider />
                <Button
                    type={'link'}
                    onClick={onChangeButton}>
                    {isResgiter ? '已经有账号了？直接登录' : '没有账号？注册新账号'}
                </Button>
            </ShadowCard>
        </Container>
    )

}


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 100vh;
`

const Header = styled.header`
    background: url(${logo}) no-repeat center;
    padding: 5rem 0;
    background-size: 8rem;
    width: 100%;
`

// 对antd组件的样式的覆盖
const ShadowCard = styled(Card)`
    width: 40rem;
    min-height: 56rem;
    padding: 3.2rem 4rem;
    border-radius: 0.3rem;
    box-sizing: border-box;
    box-shadow: rgba(0,0,0,0.1) 0 0 10px;
    text-align: center;
`

const Title = styled.h2`
    margin-bottom: 2.4rem;
    color: rgb(94, 108, 132);
`

// 背景图片
const Background = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: left bottom, right bottom;
    background-size: calc(((100vw - 40rem)/2) - 3.2rem), calc(((100vw - 40rem)/2) - 3.2rem) cover;
    background-image: url(${left}), url(${right});
`

export const LongButton = styled(Button)`
    width: 100%;
`