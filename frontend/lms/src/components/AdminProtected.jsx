import React from "react";
import { Redirect, Route } from "react-router-dom";
const AdminProtected = ({ component: Cmp, ...rest }) => (
  // localStorage.getItem("role")==="superAdmin"
  <Route
    {...rest}
    render={(props) =>
      (localStorage.getItem("login") &&
        localStorage.getItem("role") === "superAdmin") ||
      localStorage.getItem("role") === "Admin" ? (
        <Cmp {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);

export default AdminProtected;
