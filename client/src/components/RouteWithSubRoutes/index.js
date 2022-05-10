import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

export function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

RouteWithSubRoutes.propTypes = {};

RouteWithSubRoutes.defaultProps = {
  routes: [],
};
