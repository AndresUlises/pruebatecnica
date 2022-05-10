import React, { memo, useState } from "react";
import { Layout, Menu } from "antd";
import PropTypes from "prop-types";

import AppLogo from "./AppLogo";
import AppOptionLabel from "./AppOptionLabel";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AppLayout({ defaultSelected, children, appOptions, appTheme }) {
  const [collapsed, setCollapsed] = useState(false);

  function onChangeCollapse(collapsed) {
    setCollapsed(collapsed);
  }

  return (
    <Layout style={{ minHeight: "100vh" }} hasSider>
      <Sider collapsible collapsed={collapsed} onCollapse={onChangeCollapse}>
        <AppLogo />
        <Menu
          theme={appTheme}
          defaultSelectedKeys={[defaultSelected]}
          mode="inline"
        >
          {appOptions.map((option) =>
            option.items && option.items.length ? (
              <SubMenu
                icon={option.icon}
                key={option.label.toLowerCase()}
                title={<AppOptionLabel label={option.label} isSubMenu />}
              >
                {option.items.map((item) => (
                  <Menu.Item key={item.label.toLowerCase()} icon={item.icon}>
                    <AppOptionLabel label={item.label} path={item.path} />
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={option.label.toLowerCase()} icon={option.icon}>
                <AppOptionLabel label={option.label} path={option.path} />
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "#fff" }} />
        <Content style={{ margin: "16px 16px" }}>{children}</Content>
        <Footer style={{ textAlign: "center", padding: "10px 50px" }}>
          Delivery System ©2020 Created by Jala.
        </Footer>
      </Layout>
    </Layout>
  );
}

AppLayout.propTypes = {
  appTheme: PropTypes.string.isRequired,
  appOptions: PropTypes.array,
  children: PropTypes.element,
};

AppLayout.defaultProps = {
  appOptions: [],
};

export default memo(AppLayout);
