import React from "react";
import { m } from "framer-motion";
import LazyAnimate from "./LazyAnimate";
import "./Wrapper.css";

const wrapperVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    x: "50%",
    transition: { duration: 0.3 },
  },
};
const Wrapper = ({ children }) => {
  return (
    <LazyAnimate>
      <m.main
        variants={wrapperVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="wrapper-home"
      >
        {children}
      </m.main>
    </LazyAnimate>
  );
};

export default Wrapper;
