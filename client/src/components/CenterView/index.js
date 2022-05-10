import styled from "styled-components";

export const CenterView = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  width: inherit;
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;
