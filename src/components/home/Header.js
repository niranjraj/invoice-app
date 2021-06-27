import React from 'react';
import Button from '../shared/Button';
import Dropdown from '../shared/Dropdown';
import './Header.css';

export const Header = () => {
    return (
      <>
      <div className="home-header">
         <div>
          <h1 className="invoice-header">Invoices</h1> 
          <p className="invoice-msg">There are 7 total invoices.</p>
        </div>
        <Dropdown/>
        <Button>
          New Invoice
        </Button>
        </div>
      </>
    )
}
