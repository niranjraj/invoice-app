import React from 'react'
import "./Button.css";



const Button=React.memo(({type="button",onClick,children,altValue,iconValue,buttonStyle="transparent-btn",buttonSize="medium",forwardedRef,disabled=false}) =>{
 
    return (
        <button ref={forwardedRef} className={`btn ${buttonStyle} ${buttonSize}`} onClick={onClick} type={type} disabled={disabled} >
            {iconValue && <img src={iconValue} alt={altValue} className="icon-value"/>}
            {children && <span className="btn-text">{children}</span>}
        </button>
    )
})


export default Button
