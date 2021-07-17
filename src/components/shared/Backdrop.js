import React from "react";
import "./Backdrop.css";
import LazyAnimate from "./LazyAnimate";
import { m, AnimatePresence } from "framer-motion";

const animation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

function Backdrop({ formIsOpen, popUpMode, setFormIsOpen }) {
  return (
    <AnimatePresence>
      {formIsOpen && (
        <LazyAnimate>
          <m.div
            className={`backdrop-style ${popUpMode ? "popMode" : ""}`}
            variants={animation}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setFormIsOpen(false)}
          ></m.div>
        </LazyAnimate>
      )}
    </AnimatePresence>
  );
}

export default Backdrop;
