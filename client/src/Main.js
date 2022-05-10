import React from "react";
import { Switch } from "react-router-dom";
import AppLayout, { RouteWithSubRoutes } from "./components";
import { ContactsOutlined, LogoutOutlined } from "@ant-design/icons";
import { routes } from "./routes";

function Main({ history }) {
  return (
    <AppLayout
      history={history}
      defaultSelected="contacts"
      appOptions={[
        {
          icon: <ContactsOutlined />,
          label: "Contacts",
          path: "contacts",
        },
        {
          icon: <LogoutOutlined />,
          label: "Logout",
          path: "logout",
        },
      ]}
      appTheme="dark"
      breadcrumbs={[]}
    >
      <Switch>
        {routes.map((route) => (
          <RouteWithSubRoutes key={route.path.replace("/", "-")} {...route} />
        ))}
      </Switch>
    </AppLayout>
  );
}

export default Main;
