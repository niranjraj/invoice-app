import React from 'react'

function DropdownOption({checked,id,children}) {

    const handleClick=(id) =>{}
    return (
        <div>
            
              <input type="checkbox" checked={checked} onChange={() => {handleClick(id)}}/>
              <label htmlFor={id}>{children}</label>
        </div>
    )
}

export default DropdownOption
