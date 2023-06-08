import React from 'react'

import WebAppState from './webAppState/webAppState'


export default function WrapContexts(props) {
    return (
        <>
            <WebAppState>
                {props.children}
            </WebAppState>
        </>
    )
}