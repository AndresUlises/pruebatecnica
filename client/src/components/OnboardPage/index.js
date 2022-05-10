import React from "react";
import { Row, Col, Spin } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Page } from "../Page";
import { CenterView } from "../CenterView";

const PageView = styled.section`
  width: 700px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0px 5px;
  }
`;

const OnboardPageHeaderContainer = styled(CenterView)`
  flex-direction: column;
  padding-bottom: 20px;
  h2 {
    text-align: center;
    padding-bottom: 20px;
    color: #3a4557;
    font-size: 26px;
    line-height: 1;
    font-weight: 500;
    @media (max-width: 1024px) {
      font-size: 18px;
    }
  }
`;

const OnboardPageFooter = styled(CenterView)`
  flex-direction: column;
  font-size: 18px;
  line-height: 1;
  @media (max-width: 1024px) {
    font-size: 12px;
  }
`;

const OnboardPageForm = styled(CenterView)`
  flex-direction: column;
  padding-top: 10px;
  .container-form {
    width: 100%;
    .ant-btn {
      text-transform: uppercase;
    }
  }
`;

function OnboardPageHeader({ title, content }) {
  return (
    <OnboardPageHeaderContainer>
      {title && (
        <Row>
          <Col span={24}>
            <h2>{title}</h2>
          </Col>
        </Row>
      )}
      {content && (
        <Row>
          <Col span={24}>{content}</Col>
        </Row>
      )}
    </OnboardPageHeaderContainer>
  );
}

export function OnboardPage({ spinning, messageSpin, header, form, footer }) {
  return (
    <Page style={{ height: "100vh" }} direction="column">
      <PageView>
        <Spin spinning={spinning} tip={messageSpin ? messageSpin : ""}>
          {header && (
            <Row>
              <Col span={24}>
                <OnboardPageHeader
                  title={header.title}
                  content={header.content}
                />
              </Col>
            </Row>
          )}
          {form && (
            <Row>
              <Col span={24}>
                <OnboardPageForm children={form} />
              </Col>
            </Row>
          )}
          {footer && (
            <Row>
              <Col span={24}>
                <OnboardPageFooter children={footer} />
              </Col>
            </Row>
          )}
        </Spin>
      </PageView>
    </Page>
  );
}

OnboardPage.propTypes = {
  spinning: PropTypes.bool,
  messageSpin: PropTypes.string,
  form: PropTypes.element,
  header: PropTypes.object,
  footer: PropTypes.element,
};

OnboardPage.defaultProps = {
  spinning: false,
  messageSpin: "",
};
