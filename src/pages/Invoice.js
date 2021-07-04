import React, { useEffect, useState } from "react";
import "./Invoice.css";
import InvoiceHeader from "../components/invoice/InvoiceHeader";
import InvoiceContent from "../components/invoice/InvoiceContent";
import { useInvoice } from "../contexts/InvoiceContext";
import InvoiceForm from "../components/form/InvoiceForm";
import { Link, useParams } from "react-router-dom";
import Backdrop from "../components/shared/Backdrop";
import PopUp from "../components/shared/PopUp";
import { useAuth } from "../contexts/AuthContext";
import { deleteInvoice } from "../services/api";
import {useHistory} from "react-router-dom"
function Invoice() {
  const { invoices } = useInvoice();
  const history =useHistory();
  const { user ,setLoading} = useAuth();
  const leftArrow = (
    <i className="fas fa-angle-down" style={{ transform: "rotate(90deg)" }}></i>
  );
  const { id } = useParams();
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [popIsOpen, setPopIsOpen] = useState(false);

  function handleDelete(userId, invoiceId) {
    setLoading(true);
    deleteInvoice(userId, invoiceId);
    setPopIsOpen(false);
    setLoading(false);
    history.push("/");
  }
  useEffect(() => {
    setCurrentInvoice(invoices?.find((item) => id === item.id));
  }, [id, invoices]);

  return (
    <>
      {currentInvoice && (
        <div>
          <PopUp
            popUpIsOpen={popIsOpen}
            handleClick={handleDelete}
            userId={user.uid}
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
              <div className="left-arrow-icon">{leftArrow}</div>
              <span>Go back</span>
            </Link>
            <InvoiceHeader
              setPopIsOpen={setPopIsOpen}
              invoiceId={currentInvoice.id}
              status={currentInvoice.status}
              setFormIsOpen={setFormIsOpen}
            />
            <InvoiceContent invoice={currentInvoice} />
          </div>
        </div>
      )}
    </>
  );
}

export default Invoice;
