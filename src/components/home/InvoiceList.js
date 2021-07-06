import React from "react";
import InvoiceItem from "./InvoiceItem";
import EmptyPage from "../../pages/EmptyPage";
import "./InvoiceList.css";

const InvoiceList = React.memo(({ invoices }) => {
  return (
    <>
      {invoices && (
        <div className="invoicelist-wrapper">
          {invoices.length > 0 ? (
            invoices.map((invoiceitem) => {
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
            })
          ) : (
            <EmptyPage isErrorPage={false} />
          )}
        </div>
      )}
    </>
  );
});

export default InvoiceList;
