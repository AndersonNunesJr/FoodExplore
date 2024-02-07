import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.button`
  display: flex;
  width: 100%;
  padding: 12px 32px;
  align-items: center;
  justify-content: center;
  border: none;
  gap: 10px;

  > svg {
    background: transparent;
  }

  background-color: ${theme.getColorStyle("TOMATO_100")};
  border-radius: 5px;

  color: ${theme.getColorStyle("LIGHT_100")};
  ${theme.getFontStyle("Poppins_100_medium")}
`;
