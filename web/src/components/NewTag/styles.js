import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  align-items: center;

  width: 120px;

  background-color: ${({ isnew }) =>
    isnew ? "transparent" : theme.getColorStyle("LIGHT_600")};

  border: ${({ isnew }) =>
    isnew ? `1px dashed ${theme.getColorStyle("LIGHT_500")};;` : "none"};

  border-radius: 8px;
  padding-right: 10px;

  > button {
    display: flex;
    align-items: center;
    border: none;
    background: none;

    svg {
      border: none;
      background: none;
    }
  }

  .button-delete {
    color: ${theme.getColorStyle("LIGHT_100")};
  }

  .button-add {
    color: ${theme.getColorStyle("LIGHT_500")};
  }
  > input {
    width: 100%;
    padding: 0 0 0 10px;

    color: ${theme.getColorStyle("LIGHT_100")};
    background: transparent;

    border: none;
    outline: none;

    ${theme.getFontStyle("Roboto_Smaller_normal")}

    &::placeholder {
      color: ${theme.getColorStyle("LIGHT_500")};
    }
  }
`;
