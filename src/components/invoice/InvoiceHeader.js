import React from "react";
import InvoiceStatus from "../shared/InvoiceStatus";
import "./InvoiceHeader.css";
import InvoiceButtons from './invoiceButtons';

function InvoiceHeader({ status, setFormIsOpen, setPopIsOpen,handleMark ,wait}) {

  return (
    <section className="invoice-header-wrapper">
      <span className="invoice-header-status">Status</span>
      <InvoiceStatus status={status} />
      <div className="invoice-header-btn-wrapper">
          <InvoiceButtons status={status} setFormIsOpen={setFormIsOpen} wait={wait} handleMark={handleMark} setPopIsOpen={setPopIsOpen} />
      </div>
    </section>
  );
}

export default InvoiceHeader;
