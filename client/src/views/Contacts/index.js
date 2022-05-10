import React from "react";
import { Switch, Redirect, useRouteMatch } from "react-router-dom";
import { RouteWithSubRoutes } from "../../components";

function Contacts({ routes }) {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Redirect to={`${path}/all`} from={`${path}`} exact />
      {routes.map((route) => {
        return (
          <RouteWithSubRoutes key={route.path.replace("/", "-")} {...route} />
        );
      })}
    </Switch>
  );
}

Contacts.propTypes = {};

export default Contacts;
