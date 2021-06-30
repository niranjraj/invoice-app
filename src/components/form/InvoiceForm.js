import React from "react";
import { Formik, Form } from "formik";
import Fields from "./Fields";
import Button from "../shared/Button";
import { initialValues, validationSchema } from "../utils/FormValidation";
import "./InvoiceForm.css";
function InvoiceForm({setIsOpen}) {
  const onSubmit = (values) => {
    console.log();
  };
  const addDraft= values =>{
    console.log("savedToDraft " +values)
  }


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <div className="form-wrapper">
          <Form className="form-main">
            <h2 className="form-heading">Create Invoice</h2>
            <Fields />
            <div className="form-btn-wrapper">
              <Button buttonStyle="discard-btn" buttonSize="large" onClick={() => setIsOpen(false)}>Discard</Button>
              <Button buttonStyle="draft-btn" buttonSize="large" onClick={() => addDraft(formik.values)}>
                Save as Draft
              </Button>
              <Button buttonStyle="save-send-btn" buttonSize="large" type="submit" >Save & Send</Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default InvoiceForm;
