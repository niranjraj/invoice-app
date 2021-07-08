import React from 'react'
import "./InvoiceStatus.css"
function InvoiceStatus({status}) {
    console.log("invoice Status")
    return (
        <div className={`invoiceStatus ${status}-active`}>
        <div className="invoiceStatus-circle"></div>
        <div className="invoiceStatus-text">{status}</div>
    </div>
    )
}

export default InvoiceStatus
