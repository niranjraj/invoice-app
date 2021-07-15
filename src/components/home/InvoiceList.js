import React from "react";
import InvoiceItem from "./InvoiceItem";
import EmptyPage from "../../pages/EmptyPage";
import InfiniteScroll from "react-infinite-scroll-component";
import "./InvoiceList.css";

const InvoiceList = React.memo(({ invoices, scrollUpdate, hasMore }) => {
  return (
    <>
      {invoices && (
        <div  className="invoicelist-wrapper">
          {invoices.length > 0 ? (
            <InfiniteScroll
              dataLength={invoices.length}
              next={scrollUpdate}
              hasMore={hasMore}
              loader={<h1 className="infinit-scroll-text">Loading....</h1>}
            >
              {invoices.map((invoiceitem) => {
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
              })}
            </InfiniteScroll>
          ) : (
            <EmptyPage isErrorPage={false} />
          )}
        </div>
      )}
    </>
  );
});

export default InvoiceList;
