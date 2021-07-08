import React from "react";
import InvoiceItem from "./InvoiceItem";
import { motion } from 'framer-motion'
import EmptyPage from "../../pages/EmptyPage";
import "./InvoiceList.css";

const invoiceVariant={
  hidden:{},
  visible:{
      transition:{
        staggerChildren: .15
      }
  }

}
const InvoiceList = React.memo(({ invoices }) => {
  return (
    <>
      {invoices && (
        <motion.div variants={invoiceVariant} initial="hidden" animate="visible" className="invoicelist-wrapper">
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
        </motion.div>
      )}
    </>
  );
});

export default InvoiceList;
