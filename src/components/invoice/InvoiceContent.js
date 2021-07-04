import React from "react";
import dayjs from "dayjs";
import InvoiceTable from "./InvoiceTable";
import "./InvoiceContent.css";

function InvoiceContent({ invoice }) {
  return (
    <section className="invoice-content-wrapper">
      <div className="invoice-content-grid">
        <div className="invoice-id-wrapper">
          <h1 className="invoice-content-id">
            <span>#</span>
            {invoice.id.slice(0, 5)}
          </h1>
          <div className="invoice-content-desc">{invoice.description}</div>
        </div>
        <address className="invoice-address-wrapper">
          <div>{invoice.senderAddress.street}</div>
          <div>{invoice.senderAddress.city}</div>
          <div>{invoice.senderAddress.postCode}</div>
          <div>{invoice.senderAddress.country}</div>
        </address>
        <div className="invoice-payment-wrapper">
          <div className="invoice-content-date">
            <span className="invoice-content-date-label">Invoice Date</span>
            <h3 className="invoice-content-date-heading">{dayjs(invoice.createdAt).format("DD MMM YYYY")}</h3>
          </div>
          <div className="invoice-content-due">
            <span className="invoice-content-due-label">Payment Due</span>
            <h3 className="invoice-content-due-heading">{dayjs(invoice.paymentDue).format("DD MMM YYYY")}</h3>
          </div>
        </div>
        <address className="invoice-client-address-wrapper">
          <div className="invoice-client-address-label">Bill To</div>
          <div className="invoice-client-name">{invoice.clientName}</div>
          <div className="invoice-client-address-content">
            <span>{invoice.clientAddress.street}</span>
            <span>{invoice.clientAddress.city}</span>
            <span>{invoice.clientAddress.postCode}</span>
            <span>{invoice.clientAddress.country}</span>
          </div>
        </address>
        <div className="invoice-email-wrapper">
          <div className="invoice-email-label">Sent To</div>
          <div className="invoice-email-content">{invoice.clientEmail}</div>
        </div>
        <InvoiceTable items={invoice.items} total={invoice.total} />
      </div>
    </section>
  );
}

export default InvoiceContent;
