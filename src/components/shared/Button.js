import React from 'react'
import "./Button.css";
function Button({type,onClick,children,iconValue,buttonStyle,buttonSize}) {
    const iconStatus=iconValue ? true :false;

    return (
        <button className={`btn ${buttonStyle} ${buttonSize}`} onClick={onClick} type={type}>
            {iconStatus && <span className="icon-value">{iconValue}</span>}
            <span className="btn-text">{children}</span>
        </button>
    )
}

export default Button
