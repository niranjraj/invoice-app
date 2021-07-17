import React, { useState } from "react";
import "./Login.css";
import { m, AnimatePresence } from "framer-motion";
import { setUserId } from "../services/api";
import Button from "../components/shared/Button";
import Backdrop from "../components/shared/Backdrop";
import { Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Seo from "../components/shared/Seo";
import crossIcon from "../assets/images/icon-plus.svg";
import googleIcon from "../assets/images/google.svg";
import invoiceContent from "../assets/images/invoice-content.svg";
import LazyAnimate from "../components/shared/LazyAnimate";
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
  const { login, user, setUser, setLoading, setError } = useAuth();
  const history = useHistory();

  async function signIn() {
    setLoading(true);
    try {
      const result = await login();
      if (result.user) {
        setUser(result.user);
        if (result.additionalUserInfo.isNewUser) {
          await setUserId(result.user.uid, result.user.displayName);
        }
        history.push("/home");
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong...");
    } finally {
      setLoading(false);
    }
  }

  if (user) {
    return <Redirect to="/home" />;
  }

  return (
    <LazyAnimate>
      <Seo title="Login | Invoicely" />
      <Backdrop formIsOpen={loginIsOpen} setFormIsOpen={setLoginIsOpen} />
      <div className="login-wrapper">
        <AnimatePresence>
          {loginIsOpen && (
            <m.div
              variants={loginVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="login-modal"
            >
              <img
                src={crossIcon}
                alt="x"
                width="22"
                height="22"
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
                onClick={signIn}
              >
                Sign in with Google
              </Button>
            </m.div>
          )}
        </AnimatePresence>

        <div className="login-head-content">
          <m.h1
            variants={headingVariant}
            initial="hidden"
            animate="visible"
            className="login-header"
          >
            {"Invoicely".split("").map((char, index) => {
              return (
                <m.span key={`${char}-${index}`} variants={letterVariant}>
                  {char}
                </m.span>
              );
            })}
          </m.h1>
          <div className="login-main-content">
            <m.h3 variants={headingVariant} initial="hidden" animate="visible">
              The Easiest way to Manage Invoices
            </m.h3>
            <m.p variants={headingVariant} initial="hidden" animate="visible">
              Create,organize and track invoices easily across all devices
            </m.p>
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
        <m.img
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
    </LazyAnimate>
  );
}

export default Login;
