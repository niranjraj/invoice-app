import React from "react";
import { Formik, Form } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import Fields from "./Fields";
import Button from "../shared/Button";
import WaitState from "../shared/WaitState";
import { setInitialValues, validationSchema } from "../utils/FormValidation";
import { createInvoice } from "../utils/FormatInvoice";
import { useAuth } from "../../contexts/AuthContext";
import { addInvoice, updateInvoice } from "../../services/api";
import "./InvoiceForm.css";

const InvoiceForm = React.memo(({ invoice, formIsOpen, setFormIsOpen }) => {
  console.log("inform");
  const { user, setSending, wait, setWait } = useAuth();

  const onSubmit = async (values) => {
    setWait(true);
    const newInvoice = { ...createInvoice("pending", values) };
    await addInvoice(user.uid, newInvoice);
    setSending(true);
    setWait(false);
    setFormIsOpen(false);
  };

  const addDraft = async (values) => {
    setWait(true);
    const newInvoice = { ...createInvoice("draft", values) };
    await addInvoice(user.uid, newInvoice);
    setSending(true);
    setWait(false);
    setFormIsOpen(false);
  };

  async function handleUpdate(values, errors) {
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      setWait(true);
      const updatedInvoice = { ...createInvoice("pending", values) };
      await updateInvoice(user.uid, invoice.id, updatedInvoice);
      setSending(true);
      setWait(false);
    }
    setFormIsOpen(false);
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
                      buttonStyle="edit-cancel-btn"
                      onClick={() => setFormIsOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      buttonSize="large"
                      buttonStyle="save-send-btn"
                      disabled={wait}
                      onClick={() =>
                        formik
                          .validateForm()
                          .then(() =>
                            handleUpdate(formik.values, formik.errors)
                          )
                      }
                    >
                      {wait ? (
                        <WaitState />
                      ) : (
                        <span>
                          Save{" "}
                          <span className="span-save-send-btn">Changes</span>
                        </span>
                      )}
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
                    {wait ? (
                      <WaitState spinStyle="form-spin-btn" />
                    ) : (
                      <div className="save-btn-wrapper">
                        {" "}
                        <Button
                          buttonStyle="draft-btn"
                          buttonSize="large"
                          disabled={wait}
                          onClick={() => addDraft(formik.values)}
                        >
                          <span className="span-draft-btn">Save as</span> Draft
                        </Button>
                        <Button
                          buttonStyle="save-send-btn"
                          buttonSize="large"
                          type="submit"
                          disabled={wait}
                        >
                          Save{" "}
                          <span className="span-save-send-btn">& Send</span>
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </Form>
            </motion.div>
          )}
        </Formik>
      )}
    </AnimatePresence>
  );
});

export default InvoiceForm;
