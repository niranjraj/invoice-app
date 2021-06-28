import React from 'react'
import "./DropdownOption.css"

function DropdownOption({checked,id,children,handleClick}) {

    return (
        <label  className="dropdown-option">
              <input className="input-options"  type="checkbox" checked={checked} onChange={() => {handleClick(id)}}/>
              <span className="checkbox" ><i className="fas fa-check"></i></span>
              <span className="label-option" >{children}</span>
        </label>
    )
}

export default DropdownOption
