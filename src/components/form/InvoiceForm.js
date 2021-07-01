import React,{useContext} from "react";
import { Formik, Form } from "formik";
import { motion, AnimatePresence } from "framer-motion"
import Fields from "./Fields";
import Button from "../shared/Button";
import { initialValues, validationSchema } from "../utils/FormValidation";
import {FormContext} from "../../contexts/FormContext";
import "./InvoiceForm.css";
function InvoiceForm() {
  const [formIsOpen, setFormIsOpen] =useContext(FormContext);
  const onSubmit = (values) => {
    console.log();
    setFormIsOpen(false);
  };
  const addDraft= values =>{
    console.log("savedToDraft " +values)
  }

  console.log("in invoiceform");
  return (
    <AnimatePresence>

    {formIsOpen && <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <motion.div className="form-wrapper" initial={{x:-100}} animate={{x:0}}>
          <Form className="form-main">
            <h2 className="form-heading">Create Invoice</h2>
            <Fields />
            <div className="form-btn-wrapper">
              <Button buttonStyle="discard-btn" buttonSize="large" onClick={() => setFormIsOpen(false)}>Discard</Button>
              <Button buttonStyle="draft-btn" buttonSize="large" onClick={() => addDraft(formik.values)}>
                Save as Draft
              </Button>
              <Button buttonStyle="save-send-btn" buttonSize="large" type="submit" >Save & Send</Button>
            </div>
          </Form>
        </motion.div>
      )}
    </Formik>}

</AnimatePresence>
  );
}

export default InvoiceForm;
