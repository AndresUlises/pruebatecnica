import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthentication } from "../../hooks";

export function PrivateRoute({ children, ...leftover }) {
  const token = useAuthentication();
  return (
    <Route
      {...leftover}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect to={{ pathname: "/singing", state: { from: location } }} />
        )
      }
    />
  );
}
