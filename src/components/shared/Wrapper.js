import React from 'react'
import './Wrapper.css';
const Wrapper = ({children}) => {
    return (
        <main className="wrapper-main">
            {children}
        </main>
    )
}

export default Wrapper
