import styled from "styled-components";
import backgroundImg from "../../assets/name_parma400.png";
import theme from "../../styles/theme";

export const Container = styled.div`
  height: 100vh;
  display: flex;

  > div {
    background: url(${backgroundImg}) no-repeat center center;
    height: 50%;
    width: 500px;
    background-color: ${theme.getColorStyle("CARROT_100")};
    border: red;

    ${theme.getFontStyle("Roboto_Smaller_bold")}
  }
`;
