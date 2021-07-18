import React from "react";
import Login from "./Login";
import Home from "./Home";
import { useAuth } from "../contexts/AuthContext";

const WrapperRoute = () => {
  const { user } = useAuth();
  const localUser=JSON.parse(localStorage.getItem("user"));
  return <>{(user ||localUser) ? <Home /> : <Login />}</>;
};

export default WrapperRoute;
