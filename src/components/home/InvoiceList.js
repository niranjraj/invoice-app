import React from "react";
import InvoiceItem from "./InvoiceItem";

import "./InvoiceList.css";
function InvoiceList({invoices}) {


  return (
    <div className="invoicelist-wrapper">
      {invoices? invoices.map((invoiceitem) => {
        return (
          <InvoiceItem
            key={invoiceitem.id}
            id={invoiceitem.id}
            paymentDue={invoiceitem.paymentDue}
            clientName={invoiceitem.clientName}
            total={invoiceitem.total}
            status={invoiceitem.status}
          />
        );
      }):<p>nothing here</p>}
    </div>
  );
}

export default InvoiceList;
