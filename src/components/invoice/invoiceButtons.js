import React from "react";
import Button from "../shared/Button";
import "./InvoiceButtons.css"
import WaitState from "../shared/WaitState";
const invoiceButtons = ({
  status,
  setFormIsOpen,
  setPopIsOpen,
  handleMark,
  wait
}) => {
  return (
    <>
      <Button
        buttonStyle="invoice-edit-btn"
        onClick={() => setFormIsOpen(true)}
        buttonSize="large"
      >
        Edit
      </Button>
      <Button
        buttonStyle="invoice-delete-btn"
        onClick={() => setPopIsOpen(true)}
        buttonSize="large"
      >
        Delete
      </Button>
      {status !== "draft" && (
        <Button
          buttonStyle="invoice-paid-btn"
          onClick={() => handleMark(status)}
          buttonSize="large"
        >
         {wait?<WaitState/>: <span><span className="mark-btn-span">Mark as </span>{status === "paid" ? "Pending" : "Paid"}</span> }
        </Button>
      )}
    </>
  );
};

export default invoiceButtons;
