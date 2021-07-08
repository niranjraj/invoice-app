import React from 'react';
import { useField } from 'formik';
import './Input.css'
const Input=React.memo(({ label, name,className, hideLabels, ...props }) =>{
    const [field, meta] = useField(name);
    const valid=!(meta.touched && meta.error)
    return (
        <div className="input-wrapper">
            <label className={`input-label ${valid?"":"touched-label"}`} htmlFor={name} >{label}</label>
            <input className={`input-field-main ${className? className:""} ${valid?"":"touched-input"}`} type="text" id={name} {...field}  {...props}/>
        </div>
    )
})

export default Input
