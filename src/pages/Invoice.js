import React, { useEffect, useState } from "react";
import "./Invoice.css";
import InvoiceHeader from "../components/invoice/InvoiceHeader";
import InvoiceContent from "../components/invoice/InvoiceContent";
import Seo from "../components/shared/Seo"
import { useInvoice } from "../contexts/InvoiceContext";
import InvoiceForm from "../components/form/InvoiceForm";
import { Link, useParams } from "react-router-dom";
import Backdrop from "../components/shared/Backdrop";
import PopUp from "../components/shared/PopUp";
import { useAuth } from "../contexts/AuthContext";
import { deleteInvoice } from "../services/api";
import { updateStatus } from "../services/api";
import InvoiceButtons from "../components/invoice/invoiceButtons";
import { useHistory } from "react-router-dom";
import leftArrow from "../assets/images/icon-arrow-left.svg";
function Invoice() {
  const { id } = useParams();
  const history = useHistory();
  const { invoices } = useInvoice();

  const idCheck = invoices?.find((invoiceItem) => invoiceItem.id === id);
  if (idCheck) {
    sessionStorage.setItem("invoiceId", id);
  } else if (!idCheck) {
    const sessionId = sessionStorage.getItem("invoiceId");
    if (sessionId !== id) {
      //random value to push for 404 page
      history.push("/dsajf");
    }
  }

  const { user, setSending, setWait, wait } = useAuth();

  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [popIsOpen, setPopIsOpen] = useState(false);

  useEffect(() => {
    setCurrentInvoice(invoices?.find((item) => id === item.id));
  }, [id, invoices]);

  const handleMark = async (status) => {
    setWait(true);
    if (status === "paid") {
      await updateStatus(user.uid, currentInvoice.id, "pending");
      setSending(true);
      setWait(false);
      return;
    } else if (status === "pending" || "draft") {
      await updateStatus(user.uid, currentInvoice.id, "paid");
      setSending(true);
      setWait(false);
      return;
    }
  };
  async function handleDelete(userId, invoiceId) {
    setWait(true);
    await deleteInvoice(userId, invoiceId);
    setSending(true);
    setWait(false);
    setPopIsOpen(false);
    history.push("/");
  }

  return (
    <>
      {currentInvoice && (
        <div>
          <Seo title={`Invoice #${id.slice(0,6).toUpperCase()}`} />
          <PopUp
            popUpIsOpen={popIsOpen}
            handleClick={handleDelete}
            userId={user.uid}
            wait={wait}
            invoiceId={currentInvoice.id}
            setPopIsOpen={setPopIsOpen}
          />
          <Backdrop formIsOpen={formIsOpen} setFormIsOpen={setFormIsOpen} />
          <InvoiceForm
            invoice={currentInvoice}
            formIsOpen={formIsOpen}
            setFormIsOpen={setFormIsOpen}
          />
          <div className="invoice-wrapper">
            <Link className="home-link-wrapper" to={"/"}>
              <img src={leftArrow} alt="<-" className="left-arrow-icon"/>
              <span>Go back</span>
            </Link>
            <InvoiceHeader
              setPopIsOpen={setPopIsOpen}
              invoiceId={currentInvoice.id}
              status={currentInvoice.status}
              wait={wait}
              setFormIsOpen={setFormIsOpen}
              handleMark={handleMark}
            />
            <InvoiceContent invoice={currentInvoice} />
          </div>
          <div className="invoice-footer">
            <InvoiceButtons
              status={currentInvoice.status}
              wait={wait}
              setFormIsOpen={setFormIsOpen}
              setPopIsOpen={setPopIsOpen}
              handleMark={handleMark}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Invoice;
