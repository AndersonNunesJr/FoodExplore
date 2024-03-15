import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  position: relative;
  align-items: center;

  width: 50%;
  gap: 10px;
  padding: 0 14px;
  border-radius: 8px;

  cursor: text;

  background: ${theme.getColorStyle("DARK_900")};
  color: ${theme.getColorStyle("LIGHT_400")};

  &.width_100 {
    width: 100%;
  }
  > svg {
    background: transparent;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 36px;

  background: transparent;
  color: ${theme.getColorStyle("LIGHT_400")};

  border: none;
  outline: none;
`;
