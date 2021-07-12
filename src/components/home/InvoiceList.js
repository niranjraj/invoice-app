import React from "react";
import InvoiceItem from "./InvoiceItem";
import { motion } from "framer-motion";
import EmptyPage from "../../pages/EmptyPage";
import WaitState from "../shared/WaitState"

import InfiniteScroll from "react-infinite-scroll-component";
import "./InvoiceList.css";

const invoiceVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};
const InvoiceList = React.memo(({ invoices ,scrollUpdate,hasMore}) => {

  
  return (
    <>
      {invoices && (
        <motion.div
          variants={invoiceVariant}
          initial="hidden"
          animate="visible"
          className="invoicelist-wrapper"
        >
          {invoices.length > 0 ? (
            <InfiniteScroll dataLength={invoices.length}  next={scrollUpdate} hasMore={hasMore}   loader={<h1 className="infinit-scroll-text">Loading....</h1>}  >
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
        </motion.div>
      )}
    </>
  );
});

export default InvoiceList;
