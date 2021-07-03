import React, { useContext } from "react";
import { Formik, Form } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import Fields from "./Fields";
import Button from "../shared/Button";
import {useInvoice} from "../../contexts/InvoiceContext"
import { initialValues, validationSchema } from "../utils/FormValidation";
import { createInvoice } from "../utils/FormatInvoice";
import { FormContext } from "../../contexts/FormContext";
import { useAuth } from "../../contexts/AuthContext";
import { addInvoice } from "../../services/api";
import "./InvoiceForm.css";
function InvoiceForm() {
  const [formIsOpen, setFormIsOpen] = useContext(FormContext);
  const {setSending}= useInvoice();
  const { user } = useAuth();

  const onSubmit = async (values) => {
    setSending(true);
    const newInvoice = { ...createInvoice("pending", values) };
    await addInvoice(user.uid, newInvoice);
    setSending(false);
    setFormIsOpen(false);
  };
  const addDraft = (values) => {
    console.log(values);
  };

  console.log("in invoiceform");
  return (
    <AnimatePresence>
      {formIsOpen && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <motion.div
              className="form-wrapper"
              initial={{ x: -100 }}
              animate={{ x: 0 }}
            >
              <Form className="form-main">
                <h2 className="form-heading">Create Invoice</h2>
                <Fields />
                <div className="form-btn-wrapper">
                  <Button
                    buttonStyle="discard-btn"
                    buttonSize="large"
                    onClick={() => setFormIsOpen(false)}
                  >
                    Discard
                  </Button>
                  <Button
                    buttonStyle="draft-btn"
                    buttonSize="large"
                    onClick={() => addDraft(formik.values)}
                  >
                    Save as Draft
                  </Button>
                  <Button
                    buttonStyle="save-send-btn"
                    buttonSize="large"
                    type="submit"
                  >
                    Save & Send
                  </Button>
                </div>
              </Form>
            </motion.div>
          )}
        </Formik>
      )}
    </AnimatePresence>
  );
}

export default InvoiceForm;
