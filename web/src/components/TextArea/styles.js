import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.textarea`
  width: 100%;
  height: 190px;

  background-color: ${theme.getColorStyle("DARK_800")};
  color: ${theme.getColorStyle("LIGHT_500")};

  border: none;
  resize: none;

  margin-bottom: 8px;
  border-radius: 10px;
  padding: 16px;

  &::placeholder {
    color: ${theme.getColorStyle("LIGHT_500")};
  }
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.getColorStyle("LIGHT_500")};
    border-radius: 5px;
  }
`;
