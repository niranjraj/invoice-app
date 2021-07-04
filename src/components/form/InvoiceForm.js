import React, { useContext } from "react";
import { Formik, Form, FormikConsumer } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import Fields from "./Fields";
import Button from "../shared/Button";
import formErrorMsg from "../utils/ErrorMessage";
import { useInvoice } from "../../contexts/InvoiceContext";
import { setInitialValues, validationSchema } from "../utils/FormValidation";
import { createInvoice } from "../utils/FormatInvoice";
import { FormContext } from "../../contexts/FormContext";
import { useAuth } from "../../contexts/AuthContext";
import { addInvoice, updateInvoice } from "../../services/api";
import "./InvoiceForm.css";
import { object } from "yup/lib/locale";
function InvoiceForm({ invoice, formIsOpen, setFormIsOpen }) {
  const { setSending } = useInvoice();
  const { user } = useAuth();

  const onSubmit = async (values) => {
    setSending(true);
    const newInvoice = { ...createInvoice("pending", values) };
    await addInvoice(user.uid, newInvoice);
    setSending(false);
    setFormIsOpen(false);
  };

  const addDraft = async (values) => {
    const newInvoice = { ...createInvoice("draft", values) };
    await addInvoice(user.uid, newInvoice);
    setFormIsOpen(false);
  };

  function handleUpdate(values, errors) {
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      const updatedInvoice = { ...createInvoice("pending", values) };
      updateInvoice(user.uid, invoice.id, updatedInvoice);
    }
  }

  return (
    <AnimatePresence>
      {formIsOpen && (
        <Formik
          initialValues={setInitialValues(invoice)}
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
                {invoice ? (
                  <div className="edit-form-wrapper">
                    <Button
                      buttonSize="large"
                      buttonStyle="edit-form-cancel-btn"
                      onClick={() => setFormIsOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      buttonSize="large"
                      buttonStyle="update-form-btn"
                      onClick={() =>
                        formik
                          .validateForm()
                          .then(() =>
                            handleUpdate(formik.values, formik.errors)
                          )
                      }
                    >
                      Save Changes
                    </Button>
                  </div>
                ) : (
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
                )}
              </Form>
            </motion.div>
          )}
        </Formik>
      )}
    </AnimatePresence>
  );
}

export default InvoiceForm;
