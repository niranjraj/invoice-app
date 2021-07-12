import React from "react";
import {Helmet} from "react-helmet-async";
const Seo = ({ title,}) => {
  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content="An invoice app that supports all devices.Create invoices on the go." />
      <meta name="og:title" content={title} />
      <meta name="og:description" content="An invoice app that supports all devices.Create invoices on the go." />
      <meta name="keywords" content="invoice, invoice app, manage invoices, create invoices, save invoices, react" />
      <meta name="theme-color" content="#1E2139"/>
      <meta http-equiv="Content-Type" content="text/html"/>
      <meta property="og:type" content="website"/>
      <meta property="og:locale" content="en_US"/>
      <meta property="og:site_name" content="Invoicely"/>
    </Helmet>
  );
};

export default Seo;
