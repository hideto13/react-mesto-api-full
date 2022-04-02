import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ children, loggedIn, path }) => {
  return (
    <>
      {loggedIn ? (
        <Route path={path}>{children}</Route>
      ) : (
        <Redirect to="/sign-in" />
      )}
    </>
  );
};

export default ProtectedRoute;
