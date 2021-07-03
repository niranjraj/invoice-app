import React,{useContext} from 'react';
import Button from '../shared/Button';
import Dropdown from './Dropdown';
import {FormContext} from "../../contexts/FormContext";
import './Header.css';
import {firebase} from "../../firebase/initFirebase"

export const Header = () => {
  const plusIcon =<i className="fas fa-plus"></i>
  const [formIsOpen, setFormIsOpen] =useContext(FormContext);
  const uservalue= firebase.auth().currentUser;
    return (
      <>
      <div className="home-header">
         <div className="header-text">
          <h1 className="invoice-header">Invoices </h1> 
          <p className="invoice-msg">There are 7 total invoices.</p>
        </div>
        <Dropdown/>
        <Button iconValue={plusIcon}  onClick={() => setFormIsOpen(true)}  buttonStyle="plus-btn" >
          New <span className="invoice-span-btn">Invoice</span> 
        </Button>
        </div>
      </>
    )
}
