import React from 'react';
import Button from '../shared/Button';
import Dropdown from '../shared/Dropdown';
import './Header.css';

export const Header = () => {
  const plusIcon =<i className="fas fa-plus"></i>

    return (
      <>
      <div className="home-header">
         <div className="header-text">
          <h1 className="invoice-header">Invoices</h1> 
          <p className="invoice-msg">There are 7 total invoices.</p>
        </div>
        <Dropdown/>
        <Button iconValue={plusIcon} type="button" buttonStyle="plus-btn" buttonSize="medium">
          New <span className="invoice-span-btn">Invoice</span> 
        </Button>
        </div>
      </>
    )
}
