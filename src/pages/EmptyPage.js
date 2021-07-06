import React from "react";
import noInvoiceImg from "../assets/images/no-invoice.svg";
import Button from "../components/shared/Button";
import {Link} from "react-router-dom";
import pageNotFound from "../assets/images/pageNotFound.svg";
import "./EmptyPage.css";
function EmptyPage({ isErrorPage }) {
  return (
    <div className="no-invoice-wrapper">
      <img
        src={isErrorPage ? pageNotFound : noInvoiceImg}
        alt="NothingHere"
        className="noinvoice-img"
      />
      <h1 className="noinvoice-heading">There is nothing here.</h1>
      {isErrorPage ? (
          <Link to="/">
          <Button buttonStyle="save-send-btn" buttonSize="large">Go back to invoices list</Button>
          </Link>

      ) : (
        <p className="noinvoice-msg">
          Get started creating invoices by clicking the <br />{" "}
          <strong>New Invoice</strong> Button
        </p>
      )}
    </div>
  );
}

export default EmptyPage;
