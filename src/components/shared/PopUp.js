import React from "react";
import Button from "./Button";
import WaitState from "./WaitState";
import "./PopUp.css";

const DeletePopUp =({ popUpIsOpen, setPopIsOpen,invoiceId, userId,handleClick,wait}) => {
  return (
    <>
      {popUpIsOpen && (
        <div onClick={() => setPopIsOpen(false)} className="pop-backdrop">
          <div className="main-pop-up">
            
            <div className="delete-pop-wrapper">
              <h2 className="delete-pop-heading">Confirm Deletion</h2>
              <p className="delete-pop-msg">
                Are you sure you want to delete invoice #{invoiceId.slice(0,6).toUpperCase()}? This action cannot
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
              <Button buttonStyle="invoice-delete-btn" disabled={wait} buttonSize="large" onClick={()=>handleClick(userId,invoiceId)}>
               {wait? <WaitState/>:"Delete" }
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeletePopUp;
