import React, { forwardRef } from "react";

import ReactDatePicker from "react-datepicker";
import { useFormikContext, useField } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import calendarIcon from "../../assets/images/icon-calendar.svg"
import Button from "../shared/Button";

import "./DatePicker.css"



const datepickerContainer= ({ children}) => (
  <div className="datepicker-container">{children}</div>
);
const CustomInput = forwardRef(({ value, onClick }, ref) => {
  return (
    <Button
      forwardedRef={ref}
      buttonSize="large"
      buttonStyle="datepicker-btn"
      iconValue={calendarIcon}
      altValue="calendarIcon"
      onClick={onClick}
    >
      {value}
    </Button>
  );
});

const DatePicker=React.memo(({ label, name }) =>{
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  return (
    <div className="datepicker-wrapper">
      <label className="datepicker-label" htmlFor={name} valid="true">
        {" "}
        {label}
      </label>
      <ReactDatePicker
        id={name}
        {...field}
        selected={field.value}
        onChange={(value) => setFieldValue(name, value)}
        calendarContainer={datepickerContainer}
        customInput={<CustomInput />}
        dateFormat="MMM d, yyyy"
      />
    </div>
  );
})

export default DatePicker;
