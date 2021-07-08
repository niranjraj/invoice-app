import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Sidebar from "./components/shared/Sidebar";
import Login from "./pages/Login";
import EmptyPage from "./pages/EmptyPage";

import { InvoiceProvider } from "./contexts/InvoiceContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loading from "./pages/Loading";
import { useAuth } from "./contexts/AuthContext";
import Invoice from "./pages/Invoice";
import PrivateRoute from "./pages/PrivateRoute";
import { useState } from "react";


function App() {
  const { loading, user } = useAuth();
  const [lightTheme,setLightTheme]=useState(true)
  return (
      <div className={`container ${lightTheme? "lighttheme":"darktheme"}`}>
        <Sidebar setLightTheme={setLightTheme} lightTheme={lightTheme}/>
        <div className="wrapper-main">
          {loading ? (
            <Loading />
          ) : (
            <InvoiceProvider>
              <Router>
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <PrivateRoute exact path="/invoice/:id" component={Invoice} />
                  <Route  path="/login" component={Login} />
                  <Route>
                    <EmptyPage isErrorPage={true} />
                  </Route>
                </Switch>
              </Router>
            </InvoiceProvider>
          )}
        </div>
      </div>
  );
}

export default App;
