import React from "react";
import Input from "./Input";
import DatePicker from "./DatePicker";
import Select from "./Select";
import ItemList from "./ItemList";
import formErrorMsg from "../utils/ErrorMessage";
import "./Fields.css";
import { useFormikContext } from "formik";

const options = [
  'Net 1 Day',
  'Net 7 Days',
   'Net 14 Days',
  'Net 30 Days'
]

const Fields=React.memo(() =>{
  const formik =useFormikContext();
  return (
    <div className="fields-wrapper">
      <fieldset>
        <legend className="field-heading">Bill From</legend>
        <div className="bill-from">
          <Input label="Street Address" name="senderAddress.street" />
          <Input label="City" name="senderAddress.city" />
          <Input label="Post Code" name="senderAddress.postCode" />
          <Input label="Country" name="senderAddress.country" />
        </div>
      </fieldset>
      <fieldset>
        <legend className="field-heading">Bill To</legend>
        <div className="bill-to">
          <Input label="Client's Name" name="clientName" />
          <Input
            label="Client's Email"
            name="clientEmail"
            placeholder="e.g. email@example.com"
          />
          <Input label="Street Address" name="clientAddress.street" />
          <Input label="City" name="clientAddress.city" />
          <Input label="Post Code" name="clientAddress.postCode" />
          <Input label="Country" name="clientAddress.country" />
        </div>
      </fieldset>
      <fieldset>
          <div className="selection-field">
              <DatePicker label="Invoice Date" name="createdAt" />
              {/* <DatePicker label="Invoice Date" name="createdAt" /> */}
              <Select label="Payment Terms" name="paymentTerms" options={options}/>
              <Input label="Description" name="description" placeholder="e.g. Graphic Design Service"/>
          </div>
      </fieldset>
      <ItemList name="items"/>
      {formik.errors && <div className="invoiceform-errorlist">
          {formErrorMsg(formik.errors).map((item,index)=>{
           return  <div key={index} className="invoiceform-error">{item}</div>
          })}
      </div> }
    </div>
  );
})

export default Fields;
