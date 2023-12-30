import React from "react";
import { Route, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const ProtectedRoutes = ({ component: Component, ...rest }) => {
    const navigate = useNavigate();
  return (
    <Route
      {...rest}
      render={(props) => {
        const token = cookies.get("TOKEN");

        if (token) {
          return <Component {...props} />;
        } else {
          return (
            navigate("/")
          );
        }
      }}
    />
  );
};

export default ProtectedRoutes;
