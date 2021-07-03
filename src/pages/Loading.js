import React from 'react'
import "./Loading.css"
import {motion} from "framer-motion";

const spinTransition={
    loop:Infinity,
    duration:1,
    ease:"linear"
}
function Loading() {
    return (
        <div className="loading-state">
        <div className="loading-container">
            <motion.span className="circle-loader" animate={{rotate:360}} transition={spinTransition}></motion.span>
        </div>
        </div>
    )
}

export default Loading
