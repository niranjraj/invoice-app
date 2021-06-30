import React from "react";
import Wrapper from "../components/shared/Wrapper";
import { Header } from "../components/home/Header";
import InvoiceList from "../components/home/InvoiceList";
import Backdrop from "../components/shared/Backdrop";
import InvoiceForm from "../components/form/InvoiceForm";
function Home() {
  return (
    <>
      <Backdrop />
      <Wrapper>
        <InvoiceForm />
        <Header />
        <InvoiceList />
      </Wrapper>
    </>
  );
}

export default Home;
