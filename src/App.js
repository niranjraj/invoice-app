import React, { useState, lazy, Suspense, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/shared/Sidebar";
import Backdrop from "./components/shared/Backdrop";
import { InvoiceProvider } from "./contexts/InvoiceContext";
import { Switch, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Loading from "./pages/Loading";
import { useAuth } from "./contexts/AuthContext";
import PrivateRoute from "./pages/PrivateRoute";
import { AnimatePresence,motion } from "framer-motion";
import { useTheme } from "./hooks/useTheme";
import errorIcon from "./assets/images/error.svg";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const EmptyPage = lazy(() => import("./pages/EmptyPage"));
const Invoice = lazy(() => import("./pages/Invoice"));
const errorVariants={
  hidden:{
    opacity:0,
    y:-40,
  },
  visible:{
    opacity:1,
    x:0,
    y:0,
    transition:{
      delay:0.3,
      duration:0.5,
    },
  },
  exit:{
    opacity:0,
    scale:0.5,
    x:"100vw",
    transition:{
      duration:0.5,
    },
  }
}
function App() {
  const { loading, error, setError } = useAuth();
  const location = useLocation();
  const [lightTheme, setLightTheme] = useTheme(true);
  const [PopUp, setPopUp] = useState(false);

  useEffect(() => {
    if (error) {
      let errorTimer = setTimeout(() => setError(null), 8000);

      return () => {
        clearImmediate(errorTimer);
      };
    }
  }, [error, setError]);

  return (
    <HelmetProvider>
      <div className={`container ${lightTheme ? "lighttheme" : "darktheme"}`}>
        <Backdrop
          setFormIsOpen={setPopUp}
          popUpMode={true}
          formIsOpen={PopUp}
        />
        <Sidebar
          setLightTheme={setLightTheme}
          popIsOpen={PopUp}
          setPopIsOpen={setPopUp}
          lightTheme={lightTheme}
        />
        <AnimatePresence exitBeforeEnter>
        {(error && !loading) &&  (
          <motion.div variants={errorVariants} initial="hidden" animate="visible" exit="exit" className="error-msg" onClick={() => setError(null)}>
            <img
              className="error-msg-icon"
              src={errorIcon}
              alt="Error"
              width="40"
              height="40"
            />
            <span> {error}</span>
            <span className="error-msg-icon-close">click me to close</span>
          </motion.div>
        )}
        </AnimatePresence>
    
        <div className="wrapper-main">
          {loading ? (
            <Loading />
          ) : (
            <InvoiceProvider>
              <Suspense fallback={<Loading />}>
                <AnimatePresence exitBeforeEnter>
                  <Switch location={location} key={location.pathname}>
                    <PrivateRoute exact path="/" component={Home} />
                    <PrivateRoute
                      exact
                      path="/invoice/:id"
                      component={Invoice}
                    />
                    <Route path="/login" component={Login} />
                    <Route>
                      <EmptyPage isErrorPage={true} />
                    </Route>
                  </Switch>
                </AnimatePresence>
              </Suspense>
            </InvoiceProvider>
          )}
        </div>
      </div>
    </HelmetProvider>
  );
}

export default App;
