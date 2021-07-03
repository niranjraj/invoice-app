import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {useAuth} from '../contexts/AuthContext';

function PrivateRoute({component:RouteComponent,...rest}) {

    const {user}=useAuth()
    return (
      <Route
      {...rest}

      render={routeProps=> user ? (
        <RouteComponent {...routeProps} />
      ) : (
        <Redirect to={"/login"} />
      )}/>

   
    )
}

export default PrivateRoute
