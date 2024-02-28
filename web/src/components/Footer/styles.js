import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 12px 123px;
  background-color: ${theme.getColorStyle("DARK_600")};

  > img {
    height: 24px;
    background: transparent;
  }

  > p {
    color: ${theme.getColorStyle("LIGHT_200")};
    ${theme.getFontStyle("Roboto_Smaller_normal")}
    background: transparent;
  }
`;
