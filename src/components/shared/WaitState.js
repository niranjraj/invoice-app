import React from "react";
import { m } from "framer-motion";
import LazyAnimate from "./LazyAnimate";
import "./WaitState.css";

const spinTransition = {
  loop: Infinity,
  duration: 1,
  ease: "linear",
};
const WaitState = ({ spinStyle }) => {
  return (
    <LazyAnimate>
      {" "}
      <m.span
        className={`wait-loader ${spinStyle}`}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      ></m.span>
    </LazyAnimate>
  );
};

export default WaitState;
