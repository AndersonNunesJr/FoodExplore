import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.button`
  display: flex;

  padding: 6px 32px;
  align-items: center;
  justify-content: center;
  border: none;
  gap: 10px;

  > svg {
    background: transparent;
  }

  background-color: ${theme.getColorStyle("TOMATO_100")};
  border-radius: 5px;

  &.TOMATO_200 {
    background-color: ${theme.getColorStyle("TOMATO_200")};
  }
  &.TOMATO_300 {
    background-color: ${theme.getColorStyle("TOMATO_300")};
  }
  &.TOMATO_400 {
    background-color: ${theme.getColorStyle("TOMATO_400")};
  }

  color: ${theme.getColorStyle("LIGHT_100")};
  ${theme.getFontStyle("Poppins_100_medium")}
`;
