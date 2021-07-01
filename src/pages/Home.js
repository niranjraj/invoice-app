import React,{useContext} from "react";
import Wrapper from "../components/shared/Wrapper";
import { Header } from "../components/home/Header";
import InvoiceList from "../components/home/InvoiceList";
import Backdrop from "../components/shared/Backdrop";
import InvoiceForm from "../components/form/InvoiceForm";
import {FormContext} from "../contexts/FormContext"
function Home() {
  const [formIsOpen, setFormIsOpen] =useContext(FormContext);
  return (
    <>
      <Backdrop formIsOpen={formIsOpen} setFormIsOpen={setFormIsOpen} />
      <Wrapper>
        <InvoiceForm />
        <Header />
        <InvoiceList />
      </Wrapper>
    </>
  );
}

export default Home;
