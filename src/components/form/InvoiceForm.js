import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import Fields from "./Fields";
import Button from "../shared/Button";
import WaitState from "../shared/WaitState";
import { setInitialValues, validationSchema } from "../../utils/formValidation";
import { createInvoice } from "../../utils/formatInvoice";
import { useAuth } from "../../contexts/AuthContext";
import { addInvoice, updateInvoice } from "../../services/api";
import "./InvoiceForm.css";

const formVariants = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: {
      type: "spring",
      stiffness: 100,
      duration: 0.5,
    },
  },
};

const InvoiceForm = React.memo(({ invoice, formIsOpen, setFormIsOpen }) => {
  const { user, setSending, wait, setWait, setError, firstLogin } = useAuth();

  //removes overflow from body when form is open
  if (formIsOpen) {
    document.body.classList.add("form-modal-open");
  } else {
    if (document.body.classList) {
      document.body.classList.remove("form-modal-open");
    }
  }

  const onSubmit = async (values) => {
    setWait(true);
    try {
      const newInvoice = { ...createInvoice("pending", values) };
      await addInvoice(user.uid, newInvoice);
      setSending(true);
    } catch (error) {
      setError("Something went wrong...Invoice did not submit");
    } finally {
      setWait(false);
      setFormIsOpen(false);
    }
  };

  const addDraft = async (values) => {
    setWait(true);
    try {
      const newInvoice = { ...createInvoice("draft", values) };
      await addInvoice(user.uid, newInvoice);
      setSending(true);
    } catch (error) {
      setError("Something went wrong...Unable to add draft");
    } finally {
      setWait(false);
      setFormIsOpen(false);
    }
  };

  async function handleUpdate(values, errors) {
    try {
      if (Object.keys(errors).length === 0 && errors.constructor === Object) {
        setWait(true);
        const updatedInvoice = { ...createInvoice("pending", values) };
        await updateInvoice(user.uid, invoice.id, updatedInvoice);
        setSending(true);
      }
    } catch (error) {
      setError("Something went wrong...Invoice did not update");
    } finally {
      setWait(false);
      setFormIsOpen(false);
    }
  }

  useEffect(() => {
    firstLogin();
  }, []);

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
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
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
