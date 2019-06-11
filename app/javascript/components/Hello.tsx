import React from 'react'

interface  Props {
    message: string
}

const HelloWorld = (props: Props) => {
    return <div>Hello World!!!</div>
}

HelloWorld.defaultProps = {
    message: 'Hey'
}

export  default HelloWorld