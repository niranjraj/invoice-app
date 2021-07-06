import React from "react";
import Button from "../shared/Button";
import Dropdown from "./Dropdown";
import { invoicesMessage } from "../utils/FormatInvoice";
import "./Header.css";
const plusIcon = <i className="fas fa-plus"></i>;

export const Header = React.memo(
  ({ setFormIsOpen, invoices, filterStatus, setFilterStatus }) => {

    const message = invoicesMessage(invoices && invoices.length, filterStatus);

    return (
      <div className="home-header">
        <div className="header-text">
          <h1 className="invoice-header">Invoices</h1>
          <p className="invoice-msg">{message}</p>
        </div>
        <Dropdown setFilterStatus={setFilterStatus} />
        <Button
          iconValue={plusIcon}
          onClick={() => setFormIsOpen(true)}
          buttonStyle="plus-btn"
        >
          New <span className="invoice-span-btn">Invoice</span>
        </Button>
      </div>
    );
  }
);
