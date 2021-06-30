import React,{forwardRef} from 'react';
import ReactDatePicker from 'react-datepicker';
import { useFormikContext, useField } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../shared/Button';
import "./DatePicker.css"
function DatePicker({ label, name }) {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);
    const calendarIcon =<i className="far fa-calendar"></i>;
    const CustomInput =forwardRef(({value,onClick},ref)=>{
        return(
            <Button forwardedRef={ref} buttonSize="large" buttonStyle="datepicker-btn" iconValue={calendarIcon} onClick={onClick}>{value}</Button>
        )
    })

    return (
        <div className="datepicker-wrapper">
            <label className="datepicker-label"  htmlFor={name} valid="true"> {label}</label>
            <ReactDatePicker id={name} {...field} selected={field.value} onChange={value => setFieldValue(name, value)} customInput={<CustomInput/>}
                dateFormat="MMM d, yyyy" />

        </div>
    )
}

export default DatePicker
