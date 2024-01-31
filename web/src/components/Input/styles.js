import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  align-items: center;

  background: ${theme.getColorStyle("DARK_900")};
  color: ${theme.getColorStyle("LIGHT_400")};

  border-radius: 8px;
  width: 100%;

  > input {
    width: 100%;
    padding: 12px 14px;
    height: 48px;
    border: none;
    background: transparent;
  }
`;
