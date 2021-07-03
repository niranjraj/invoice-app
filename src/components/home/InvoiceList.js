import React from "react";
import InvoiceItem from "./InvoiceItem";
import { useInvoice } from "../../contexts/InvoiceContext";

import "./InvoiceList.css";
function InvoiceList() {
  const {invoices} = useInvoice();
  console.log(invoices)

  return (
    <div className="invoicelist-wrapper">
      {invoices? invoices.map((invoiceitem) => {
        return (
          <InvoiceItem
            key={invoiceitem.id}
            id={invoiceitem.id.slice(0,5)}
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
