import React from 'react'
import "./DropdownOption.css"

function DropdownOption({checked,id,children,handleClick}) {

    return (
        <label  className="dropdown-option">
              <span id={id} className="checkbox" onClick={() => {handleClick(id)}}></span>
              <span className="label-option" >{children}</span>
        </label>
    )
}

export default DropdownOption
