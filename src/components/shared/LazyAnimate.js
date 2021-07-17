import React from "react";
import { LazyMotion } from "framer-motion";

const LazyAnimate = ({ children }) => {
  const loadFeatures = () =>
    import("../../utils/features.js").then((res) => res.default);

  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
};

export default LazyAnimate;
