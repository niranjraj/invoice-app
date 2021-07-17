import React from "react";
import "./Loading.css";
import { m } from "framer-motion";
import LazyAnimate from "../components/shared/LazyAnimate";

const spinTransition = {
  loop: Infinity,
  duration: 1,
  ease: "linear",
};
function Loading() {
  return (
    <div className="loading-state">
      <div className="loading-container">
        <LazyAnimate>
          <m.span
            className="circle-loader"
            animate={{ rotate: 360 }}
            transition={spinTransition}
          ></m.span>
        </LazyAnimate>
      </div>
    </div>
  );
}

export default Loading;
