import React from 'react'
import './Wrapper.css';
const Wrapper = ({children}) => {
    return (
        <main className="wrapper-home">
            {children}
        </main>
    )
}

export default Wrapper
