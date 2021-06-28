import React from 'react'
import "./Button.css";



function Button({type="button",onClick,children,iconValue,buttonStyle="transparent-btn",buttonSize="medium",forwardedRef}) {
 
    return (
        <button ref={forwardedRef} className={`btn ${buttonStyle} ${buttonSize}`} onClick={onClick} type={type}>
            {iconValue && <span className="icon-value">{iconValue}</span>}
            {children && <span className="btn-text">{children}</span>}
        </button>
    )
}


export default Button
