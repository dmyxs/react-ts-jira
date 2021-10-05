import React from 'react'

if (process.env.NODE_ENV === 'development') {
    const whydidyourender = require('@welldone-software/why-did-you-render')
    whydidyourender(React, {
        trackAllPureComponents: false //是否跟踪所有函数组件
    })
}