import React, { useState } from "react";
import "./Login.css";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/shared/Button";
import Backdrop from "../components/shared/Backdrop";
import { Redirect} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import crossIcon from "../assets/images/icon-plus.svg";
import googleIcon from "../assets/images/google.svg";
import invoiceContent from "../assets/images/invoice-content.svg";

function Login() {
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const { login, user } = useAuth();


  if(user){
    return <Redirect to='/'/>
  }

  return (
    <>
      <Backdrop formIsOpen={loginIsOpen} setFormIsOpen={setLoginIsOpen} />
      <div className="login-wrapper">
        <AnimatePresence>
          {loginIsOpen && (
            <motion.div className="login-modal">
              <img
                src={crossIcon}
                alt="X"
                className="cross-icon-btn"
                onClick={() => setLoginIsOpen(false)}
              />
              <h2 className="login-greeter">
                Welcome to <span> Invoicely</span>
              </h2>
              <div className="login-divider"></div>
              <p className="login-description">
                You need to log in using google account to work with the
                invoices
              </p>
              <Button
                buttonStyle="google-btn"
                iconValue={googleIcon}
                onClick={login}
              >
                Sign in with Google
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="login-head-content">
          <h1 className="login-header">Invoicely</h1>
          <div className="login-main-content">
            <h3>The Easiest way to Manage Invoices</h3>
            <p>Create,organize and track invoices easily across all devices</p>
            <Button
              buttonStyle="login-btn"
              buttonSize="large"
              onClick={() => {
                setLoginIsOpen(true);
              }}
            >
              Login
            </Button>
          </div>
        </div>
        <img className="login-img" src={invoiceContent} alt="loginImage" />
      </div>
    </>
  );
}

export default Login;
