import React from 'react'
import './InvoiceItem.css';
import {Link} from "react-router-dom";
import InvoiceStatus from "../shared/InvoiceStatus"
import dayjs from 'dayjs';
function InvoiceItem({id, paymentDue, clientName, total, status}) {
    const rightArrow = <i className="fas fa-angle-down" style={{transform:"rotate(-90deg)"}}></i>;
    console.log(paymentDue);
    return (
        <Link to={`/invoice/${id}`}>
        <div className="invoiceItem">
            <h2 className="invoiceItem-header"><span>#</span>{id.slice(0,5)}</h2>
            <div className="invoiceItem-date">Due {dayjs(paymentDue).format('DD MMM YYYY')}</div>
            <div className="invoiceItem-client">{clientName}</div>
            <div className="invoiceItem-total"> <span>₹</span>{total}</div>
            <InvoiceStatus status={status}/>
            <div className="invoice-arrow-icon">{rightArrow}</div>
        </div>
        </Link>
    )
}

export default InvoiceItem
