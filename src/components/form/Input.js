import React from 'react';
import { useField } from 'formik';
import './Input.css'
function Input({ label, name,className, hideLabels, ...props }) {
    const [field, meta] = useField(name);
        console.log(field,meta)
    return (
        <div className="input-wrapper">
            <label className="input-label" htmlFor={name} valid={`${!(meta.touched && meta.error)}`}>{label}</label>
            <input className={`input-field-main ${className? className:""}`} type="text" id={name} {...field} valid={`${!(meta.touched && meta.error)}`} {...props}/>
        </div>
    )
}

export default Input
