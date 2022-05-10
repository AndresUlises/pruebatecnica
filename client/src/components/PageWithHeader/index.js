import React from "react";
import { PageHeader } from "antd";
import { Page } from "../Page";
import styled from "styled-components";

export const PageView = styled.section`
  height: calc(100vh - 190px);
  background-color: #fff;
`;

export function PageWithHeader({ children, title, actions, history, enabledBackButton }) {
  function goBack() {
    history.goBack();
  }
  return (
    <PageHeader
      style={{
        backgroundColor: "#f0f2f5",
        padding: "0px",
      }}
      ghost={false}
      onBack={enabledBackButton? goBack : null}
      title={title}
      extra={actions}
    >
      <PageView>
        <Page direction="column">{children}</Page>
      </PageView>
    </PageHeader>
  );
}

PageWithHeader.defaultProps = {
  title: "",
  actions: [],
  enabledBackButton: false,
};
