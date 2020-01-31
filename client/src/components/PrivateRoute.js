import React from "react";
import { Redirect } from "react-router-dom";
const PrivateRoute = ({ path, component: Component, ...kwargs }) => {
  const ProtectedComponent = props => {
    const token = localStorage.getItem("token");
    if (token) {
      return <Component {...kwargs} {...props} />;
    }
    return <Redirect to="/" />;
  };
  return <ProtectedComponent />;
};

export default PrivateRoute;
