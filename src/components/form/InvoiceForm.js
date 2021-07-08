import React from "react";
import { Formik, Form } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import Fields from "./Fields";
import Button from "../shared/Button";
import { setInitialValues, validationSchema } from "../utils/FormValidation";
import { createInvoice } from "../utils/FormatInvoice";
import { useAuth } from "../../contexts/AuthContext";
import { addInvoice, updateInvoice } from "../../services/api";
import "./InvoiceForm.css";

const InvoiceForm =React.memo(({ invoice, formIsOpen, setFormIsOpen }) =>{
  console.log("inform")
  const { user,setSending  } = useAuth();

  const onSubmit = async (values) => {
 
    const newInvoice = { ...createInvoice("pending", values) };
    await addInvoice(user.uid, newInvoice);
    setSending(true);
    setFormIsOpen(false);
  };

  const addDraft = async (values) => {
   
    const newInvoice = { ...createInvoice("draft", values) };
    await addInvoice(user.uid, newInvoice);
    setSending(true);
    setFormIsOpen(false);
  };

  async function  handleUpdate(values, errors) {
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      const updatedInvoice = { ...createInvoice("pending", values) };
      await updateInvoice(user.uid, invoice.id, updatedInvoice);
      setSending(true);
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
})

export default InvoiceForm;
