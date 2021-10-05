// 该组件解决id是string，服务器返回的id是number问题

import React from 'react'
import { Select } from 'antd';
import { Raw } from 'types'

// 实现用户传递Select的原有属性
// 使用React.ComponentProps获取antd的Select的所有属性
type SelectProps = React.ComponentProps<typeof Select>

// Omit的作用是删除SelectProps中的值，要用户传递的
interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
    value: Raw | undefined | null,
    onChange: (value?: number) => void
    defaultOptionName?: string,
    options?: { name: string, id: number }[]
}

/**
 * value 可以传入多种类型的值
 * onChange只会传入回调， number | undefined类型
 * when isNaN(Number(value)) is true， select default type
 * when select default type, onChange only return undefined
 */
export const IdSelect = (props: IdSelectProps) => {
    const { value, onChange, defaultOptionName, options, ...restProps } = props
    return (
        <Select
            value={options?.length ? toNumber(value) : 0}
            onChange={value => onChange(toNumber(value) || undefined)}
            {...restProps}
        >
            {
                defaultOptionName ? <Select.Option value={0}>
                    {defaultOptionName}
                </Select.Option> : null
            }
            {
                options?.map(option => <Select.Option value={option.id} key={option.id}>
                    {option.name}
                </Select.Option>)
            }
        </Select>
    );
}


const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)

