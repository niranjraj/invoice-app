import React from 'react'

function Button({type,onClick,children,iconValue,buttonStyle,buttonSize}) {
    const iconStatus=iconValue ? true :false;
    return (
        <button className={`btn ${buttonStyle} ${buttonSize}`} onClick={onClick} type={type}>
            {iconStatus && <span>{iconValue}</span>}
            <span>{children}</span>
        </button>
    )
}

export default Button
