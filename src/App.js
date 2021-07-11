import React,{useState,lazy,Suspense} from "react";
import "./App.css";
import Sidebar from "./components/shared/Sidebar";
import Backdrop from "./components/shared/Backdrop"
import { InvoiceProvider } from "./contexts/InvoiceContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {HelmetProvider} from "react-helmet-async";
import Loading from "./pages/Loading";
import { useAuth } from "./contexts/AuthContext";
import PrivateRoute from "./pages/PrivateRoute";
import{useTheme} from "./hooks/useTheme";

const Home= lazy(() => import('./pages/Home'));
const Login=lazy(() => import('./pages/Login'));
const EmptyPage=lazy(() => import('./pages/EmptyPage'));
const Invoice=lazy(() => import('./pages/Invoice'));

function App() {
  const { loading} = useAuth();
  const [lightTheme,setLightTheme]=useTheme(true);
  const [PopUp,setPopUp]=useState(false);

  return (
    <HelmetProvider>
      <div className={`container ${lightTheme? "lighttheme":"darktheme"}`}>
   
        <Backdrop setFormIsOpen={setPopUp}  formIsOpen={PopUp}/>
        <Sidebar setLightTheme={setLightTheme} popIsOpen={PopUp} setPopIsOpen={setPopUp} lightTheme={lightTheme}/>
        <div className="wrapper-main">
          {loading ? (
            <Loading />
          ) : (
            <InvoiceProvider>
              <Router>
                <Suspense fallback={<Loading/>}>
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <PrivateRoute exact path="/invoice/:id" component={Invoice} />
                  <Route  path="/login" component={Login} />
                  <Route>
                    <EmptyPage isErrorPage={true} />
                  </Route>
                </Switch>
                </Suspense>
              </Router>
            </InvoiceProvider>
          )}
        </div>
      </div>
      </HelmetProvider>
  );
}

export default App;
