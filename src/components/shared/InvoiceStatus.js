import React from "react";
import "./InvoiceStatus.css";
function InvoiceStatus({ status ,className}) {
  console.log("invoice Status");
  return (
    <div className={`invoiceStatus ${className} ${status}-active`}>
      <div className="invoiceStatus-circle"></div>
      <div className="invoiceStatus-text">{status}</div>
    </div>
  );
}

export default InvoiceStatus;
