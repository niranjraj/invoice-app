import React from "react";
import "./InvoiceStatus.css";

function InvoiceStatus({ status ,className}) {
  return (
    <div className={`invoiceStatus ${className} ${status}-active`}>
      <div className="invoiceStatus-circle"></div>
      <div className="invoiceStatus-text">{status}</div>
    </div>
  );
}

export default React.memo(InvoiceStatus);
