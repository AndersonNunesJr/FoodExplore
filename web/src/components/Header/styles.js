import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-template-areas: "img div";

  margin: 124px 124px 0;

  color: ${theme.getColorStyle("LIGHT_300")};
  background: linear-gradient(to bottom, #091e26, #00131c);

  position: relative;
  justify-content: end;

  > img {
    width: 119%;
    height: 150%;

    grid-area: img;

    background: transparent;

    position: absolute;
    top: -123px;
    left: -65px;
  }

  > div {
    grid-area: div;

    padding-top: 80px;
    padding-bottom: 90px;
    padding-right: 0;
    background: transparent;

    > h1 {
      background: transparent;
      ${theme.getFontStyle("Poppins_500_medium")}
    }

    > p {
      background: transparent;
      ${theme.getFontStyle("Poppins_Small_normal")}
    }
  }
`;
