import React from "react";
import "./Backdrop.css";
import { motion, AnimatePresence } from "framer-motion";

const animation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

function Backdrop({ formIsOpen,popUpMode,setFormIsOpen }) {
  return (
    <AnimatePresence>
      {formIsOpen && (
        <motion.div
          className={`backdrop-style ${popUpMode?"popMode":""}`}
          variants={animation}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => setFormIsOpen(false)}
        ></motion.div>
      )}
    </AnimatePresence>
  );
}

export default Backdrop;
