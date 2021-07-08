import React from "react";
import InvoiceStatus from "../shared/InvoiceStatus";
import { updateStatus } from "../../services/api";
import Button from "../shared/Button";
import "./InvoiceHeader.css";
import { useAuth } from "../../contexts/AuthContext";

function InvoiceHeader({ invoiceId, status, setFormIsOpen, setPopIsOpen }) {
  const { user, setSending } = useAuth();
  const handleMark = async (status) => {
    console.log("in handle");
    setSending(true);
    if (status === "paid") {
      await updateStatus(user.uid, invoiceId, "pending");
      return;
    } else if (status === "pending" || "draft") {
      await updateStatus(user.uid, invoiceId, "paid");
      return;
    }
  };
  return (
    <section className="invoice-header-wrapper">
      <span className="invoice-header-status">Status</span>
      <InvoiceStatus status={status} />
      <div className="invoice-header-btn-wrapper">
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
            Mark as {status === "paid" ? "Pending" : "Paid"}
          </Button>
        )}
      </div>
    </section>
  );
}

export default InvoiceHeader;
