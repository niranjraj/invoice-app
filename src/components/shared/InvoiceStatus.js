import React from 'react'
import "./InvoiceStatus.css"
function InvoiceStatus({status}) {
    return (
        <div className="invoiceStatus">
        <div className="invoiceStatus-circle"></div>
        <div className="invoiceStatus-text">{status}</div>
    </div>
    )
}

export default InvoiceStatus
