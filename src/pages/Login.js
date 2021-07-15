import React, { useEffect, useState } from "react";
import "./Login.css";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/shared/Button";
import Backdrop from "../components/shared/Backdrop";
import { Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { firebase } from "../firebase/initFirebase";
import crossIcon from "../assets/images/icon-plus.svg";
import googleIcon from "../assets/images/google.svg";
import invoiceContent from "../assets/images/invoice-content.svg";

const headingVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.15,
    },
  },
};

const letterVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,

    transition: {
      duration: 0.3,
    },
  },
};

const imgVariant = {
  hidden: {
    opacity: 0,
    y: -200,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const loginVariant = {
  hidden: {
    opacity: 0,
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
    opacity: 1,
    scale: 0.5,
    transition: {
      duration: 0.3,
    },
  },
};

function Login() {
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const { login, user, setUser, setLoading ,setError} = useAuth();
  const history = useHistory();

  useEffect(() => {
    console.log("here boy");
    try {
      const unsubscribe = async () => {
        if (!user) {
          const result = await firebase.auth().getRedirectResult();
          if (result.user) {
            setLoading(true);
            setUser(result.user);
            setLoading(false);
            history.push("/");
          }
        }
      };
      unsubscribe();
      return () => unsubscribe();
    } catch (error) {
      setError("Something went wrong...Please ensure cookies are enabled")
    }
    
    
  }, []);

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Backdrop formIsOpen={loginIsOpen} setFormIsOpen={setLoginIsOpen} />
      <div className="login-wrapper">
        <AnimatePresence>
          {loginIsOpen && (
            <motion.div
              variants={loginVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="login-modal"
            >
              <img
                src={crossIcon}
                alt="x"
                className="cross-icon-btn"
                onClick={() => setLoginIsOpen(false)}
              />
              <h2 className="login-greeter">
                Welcome to <span>Invoicely</span>
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
          <motion.h1
            variants={headingVariant}
            initial="hidden"
            animate="visible"
            className="login-header"
          >
            {"Invoicely".split("").map((char, index) => {
              return (
                <motion.span key={`${char}-${index}`} variants={letterVariant}>
                  {char}
                </motion.span>
              );
            })}
          </motion.h1>
          <div className="login-main-content">
            <motion.h3
              variants={headingVariant}
              initial="hidden"
              animate="visible"
            >
              The Easiest way to Manage Invoices
            </motion.h3>
            <motion.p
              variants={headingVariant}
              initial="hidden"
              animate="visible"
            >
              Create,organize and track invoices easily across all devices
            </motion.p>
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
        <motion.img
          variants={imgVariant}
          initial="hidden"
          animate="visible"
          className="login-img"
          width="640"
          height="640"
          src={invoiceContent}
          alt="loginImage"
        />
      </div>
    </>
  );
}

export default Login;
