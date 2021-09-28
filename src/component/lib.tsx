import styled from "@emotion/styled";

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