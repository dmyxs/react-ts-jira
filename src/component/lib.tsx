
import React from 'react'
import styled from "@emotion/styled";
import { Spin } from "antd";
import { Typography } from 'antd';

// 接收变量gap
export const Row = styled.div<{
    gap?: number | boolean
    between?: boolean
}>`
    display: flex;
    align-items: center;
    justify-content: ${props => props.between ? 'space-between' : undefined};
    > * { //子元素
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
    }
`

const FullPage = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const FullPageLoading = () => <FullPage>
    <Spin size={'large'} />
</FullPage>


export const FullPageErrorFallback = ({ error }: { error: Error | null }) => <FullPage>
    <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
</FullPage>