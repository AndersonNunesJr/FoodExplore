import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 24px 123px;
  gap: 32px;

  background-color: ${theme.getColorStyle("DARK_600")};

  > img {
    height: 32px;
    background: transparent;
  }
`;
