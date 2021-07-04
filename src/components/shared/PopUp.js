import React from "react";
import Button from "./Button";
import "./PopUp.css";

function DeletePopUp({ popUpIsOpen, setPopIsOpen,invoiceId, userId,handleClick }) {
  return (
    <>
      {popUpIsOpen && (
        <div onClick={() => setPopIsOpen(false)} className="pop-backdrop">
          <div className="main-pop-up">
            <div className="delete-pop-wrapper">
              <h2 className="delete-pop-heading">Confirm Deletion</h2>
              <p className="delete-pop-msg">
                Are you sure you want to delete invoice #{invoiceId.slice(0,6)}? This action cannot
                be undone
              </p>
            </div>
            <div className="delete-pop-btn-wrapper">
              <Button
                buttonSize="large"
                buttonStyle="invoice-edit-btn"
                onClick={() => setPopIsOpen(false)}
              >
                Cancel
              </Button>
              <Button buttonStyle="invoice-delete-btn" buttonSize="large" onClick={()=>handleClick(userId,invoiceId)}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeletePopUp;
