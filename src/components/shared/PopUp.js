import React from "react";
import Button from "./Button";
import WaitState from "./WaitState";
import { motion, AnimatePresence } from "framer-motion";
import "./PopUp.css";

const popVariant = {
  hidden: {
    opacity: 1,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: {
      duration: 0.3,
    },
  },
};

const PopUp = ({
  popUpIsOpen,
  setPopIsOpen,
  invoiceId,
  userId,
  handleClick,
  wait,
}) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {popUpIsOpen && (
        <div onClick={() => setPopIsOpen(false)} className="pop-backdrop">
          <motion.div
            variants={popVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="main-pop-up"
          >
            <div className="delete-pop-wrapper">
              <h2 className="delete-pop-heading">Confirm Deletion</h2>
              <p className="delete-pop-msg">
                Are you sure you want to delete invoice #
                {invoiceId.slice(0, 6).toUpperCase()}? This action cannot be
                undone
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
              <Button
                buttonStyle="invoice-delete-btn"
                disabled={wait}
                buttonSize="large"
                onClick={() => handleClick(userId, invoiceId)}
              >
                {wait ? <WaitState /> : "Delete"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PopUp;
