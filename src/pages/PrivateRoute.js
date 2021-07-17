import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {useAuth} from '../contexts/AuthContext';

function PrivateRoute({component:RouteComponent,...rest}) {

    const {user}=useAuth()
    const sessionUser=JSON.parse(sessionStorage.getItem("user"));
    return (
      <Route
      {...rest}

      render={routeProps=> (user||sessionUser) ? (
        <RouteComponent {...routeProps} />
      ) : (
        <Redirect to={"/"} />
      )}/>

   
    )
}

export default PrivateRoute
