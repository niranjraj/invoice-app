import React from "react";
import {Helmet} from "react-helmet-async";
const Seo = ({ title}) => {
  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content="An invoice app that supports all devices.Create invoices on the go." />
      <meta name="og:title" content={title} />
      <meta name="og:description" content="An invoice app that supports all devices.Create invoices on the go." />
    </Helmet>
  );
};

export default Seo;
