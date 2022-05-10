import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 0px 40px 0px;
`;

const ContainerWrap = styled.section`
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px 10px;
  display: inline-block;
  position: relative;
  display: flex;
  .code-input {
    position: absolute;
    border: none;
    font-size: 32px;
    text-align: center;
    background-color: transparent;
    outline: none;
    width: 60px;
    height: 72px;
    top: 0px;
    bottom: 0px;
  }
`;

export const CodeField = styled.div`
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  width: 60px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  position: relative;
  :last-child {
    border-right: none;
  }
`;

export const CodeFieldShadows = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  box-shadow: 0 0 0 4px rgba(24, 144, 255, 0.2);
`;

function CodeVerificationContainer({ children, handleClick }) {
  return (
    <Container>
      <ContainerWrap onClick={handleClick}>{children}</ContainerWrap>
    </Container>
  );
}

CodeVerificationContainer.propTypes = {
  handleClick: PropTypes.func,
};

CodeVerificationContainer.defaultProps = {
  handleClick: () => {},
};
export default React.memo(CodeVerificationContainer);
