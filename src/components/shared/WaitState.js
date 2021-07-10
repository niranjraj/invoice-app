import React from 'react'
import {motion} from "framer-motion"
import './WaitState.css'

const spinTransition={
    loop:Infinity,
    duration:1,
    ease:"linear"
}
const WaitState = ({spinStyle}) => {
    return (
        <motion.span className={`wait-loader ${spinStyle}`} animate={{rotate:360}} transition={spinTransition}></motion.span>
    )
}

export default WaitState
