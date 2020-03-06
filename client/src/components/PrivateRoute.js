import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import React from "react";
import AuthService from "../services/AuthService";
export const PrivateRoute = ({ component: Component, ...rest }) => {
  let isLogin = AuthService.isLogin();
  console.log('isLogin', !!isLogin);
//   console.log('isLogin', isLogin === tru);
  
  return (
    <Route
      {...rest}
      render={props => {

        return !isLogin ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};
