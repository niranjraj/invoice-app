import React from 'react';
import {useField} from 'formik';
import "./Select.css"
function Select({name,label,options}) {
    const [field]=useField(name)
    return (
        <div className="selection-field-wrapper">
        <label htmlFor={name}>{label}</label>
        <div className="select-payment-wrapper">
         <select className="select-payment-term"  {...field}>
           {options.map((option) => {
                        return (
                            <option key={option.value} value={option.value}>
                                {option.name}
                            </option>
                        )
                    })}
           </select>
         </div>
      </div>
    )
}

export default Select
