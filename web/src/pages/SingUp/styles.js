import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  height: 100vh;
  display: flex;

  > img {
    width: 500px;
  }
  > div {
    height: 50%;
    width: 500px;
    background-color: ${theme.getColorStyle("CARROT_100")};
    border: red;

    ${theme.getFontStyle("Roboto_Smaller_bold")}
  }
`;
