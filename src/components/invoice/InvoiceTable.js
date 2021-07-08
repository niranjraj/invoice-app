import React from "react";
import {currencyFormatter} from "../utils/FormatInvoice"
import "./InvoiceTable.css";

function InvoiceTable({ items, total }) {
  return (
    <div className="invoice-table-wrapper">
      <table className="invoice-table">
        <thead className="invoice-table-header">
          <tr className="invoice-table-header-row">
            <th>Item Name</th>
            <th>QTY.</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return (
              <tr className="invoice-table-body-row" key={item.name}>
                <td className="table-item-name" >{item.name}</td>
                <td className="table-item-quantity" >{item.quantity}</td>
                <td className="table-item-price" >{currencyFormatter.format(item.price)}</td>
                <td className="table-item-total" >{currencyFormatter.format(item.total)}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot className="table-footer-content">
          <tr>
            <th className="table-footer-amount" colSpan="2">Amount Due</th>

            <td className="table-footer-total" colSpan="2">{total ? total : ""}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default InvoiceTable;
