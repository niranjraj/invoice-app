import React,{useContext} from 'react';
import Button from '../shared/Button';
import Dropdown from './Dropdown';
import {FormContext} from "../../contexts/FormContext";
import {invoicesMessage} from "../utils/FormatInvoice"
import './Header.css';
import {firebase} from "../../firebase/initFirebase"

export const Header = ({setFormIsOpen,invoices,filterStatus,setFilterStatus}) => {
  const plusIcon =<i className="fas fa-plus"></i>
  const message=invoicesMessage(invoices && invoices.length,filterStatus);

    return (
      <>
      <div className="home-header">
         <div className="header-text">
          <h1 className="invoice-header">Invoices </h1> 
          <p className="invoice-msg">{message}</p>
        </div>
        <Dropdown setFilterStatus={setFilterStatus}/>
        <Button iconValue={plusIcon}  onClick={() => setFormIsOpen(true)}  buttonStyle="plus-btn" >
          New <span className="invoice-span-btn">Invoice</span> 
        </Button>
        </div>
      </>
    )
}
