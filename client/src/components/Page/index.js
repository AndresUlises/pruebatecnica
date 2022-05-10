import React from "react";
import styled from "styled-components";
import PropsTypes from "prop-types";
import { CenterView } from "../CenterView";

const ContentPageWrap = styled(CenterView)`
  flex-direction: ${(props) => props.direction};
`;

export function Page({ direction, style, children }) {
  return (
    <section style={{ ...style }}>
      <ContentPageWrap direction={direction}>{children}</ContentPageWrap>
    </section>
  );
}

Page.propsTypes = {
  direction: PropsTypes.string,
  style: PropsTypes.object,
  children: PropsTypes.elementType,
};

Page.defaultProps = {
  direction: "row",
  style: {},
};
