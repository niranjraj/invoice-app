import React, { useEffect, useState } from "react";
import "./Invoice.css";
import InvoiceHeader from "../components/invoice/InvoiceHeader";
import InvoiceContent from "../components/invoice/InvoiceContent";
import Seo from "../components/shared/Seo";
import { useInvoice } from "../contexts/InvoiceContext";
import InvoiceForm from "../components/form/InvoiceForm";
import { Link, useParams } from "react-router-dom";
import Backdrop from "../components/shared/Backdrop";
import { motion } from "framer-motion";
import PopUp from "../components/shared/PopUp";
import { useAuth } from "../contexts/AuthContext";
import { deleteInvoice, updateStatus } from "../services/api";
import InvoiceButtons from "../components/invoice/invoiceButtons";
import { useHistory, Redirect } from "react-router-dom";
import leftArrow from "../assets/images/icon-arrow-left.svg";

const invoiceVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    x: "-50%",
    transition: { duration: 0.3 },
  },
};

function Invoice() {
  const { id } = useParams();
  const history = useHistory();
  const { invoices } = useInvoice();

  const { user, setSending, setWait, wait, setError } = useAuth();

  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [popIsOpen, setPopIsOpen] = useState(false);

  useEffect(() => {
    setCurrentInvoice(invoices?.find((item) => id === item.id));
  }, [id, invoices]);

  const idCheck = invoices?.find((invoiceItem) => invoiceItem.id === id);
  if (idCheck) {
    sessionStorage.setItem("invoiceId", id);
  } else if (!idCheck) {
    const sessionId = sessionStorage.getItem("invoiceId");
    if (sessionId !== id) {
      //random value to push for 404 page
      return <Redirect to="/404" />;
    }
  }

  const handleMark = async (status) => {
    setWait(true);
    try {
      if (status === "paid") {
        await updateStatus(user.uid, currentInvoice.id, "pending");
        setSending(true);
        return;
      } else if (status === "pending" || "draft") {
        await updateStatus(user.uid, currentInvoice.id, "paid");
        setSending(true);
        return;
      }
    } catch (error) {
      setError("Something went wrong....could not update");
    } finally {
      setWait(false);
    }
  };

  async function handleDelete(userId, invoiceId) {
    setWait(true);
    try {
      await deleteInvoice(userId, invoiceId);
      setSending(true);
      history.push("/");
    } catch (error) {
      setError("Something went wrong....could not delete invoice");
    } finally {
      setWait(false);
      setPopIsOpen(false);
    }
  }

  return (
    <>
      {currentInvoice && (
        <>
          <Seo title={`Invoice #${id.slice(0, 6).toUpperCase()}`} />
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
          <motion.div
            variants={invoiceVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="invoice-wrapper"
          >
            <Link className="home-link-wrapper" to={"/"}>
              <img src={leftArrow} alt="<" width="7" height="10" className="left-arrow-icon" />
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
          </motion.div>
          <div className="invoice-footer">
            <InvoiceButtons
              status={currentInvoice.status}
              wait={wait}
              setFormIsOpen={setFormIsOpen}
              setPopIsOpen={setPopIsOpen}
              handleMark={handleMark}
            />
          </div>
        </>
      )}
    </>
  );
}

export default Invoice;
