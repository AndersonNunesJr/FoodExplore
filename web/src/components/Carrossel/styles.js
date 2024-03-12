import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  color: ${theme.getColorStyle("LIGHT_300")};

  display: flex;
  flex-direction: column;
  gap: 25px;
  margin: 50px;

  > div {
    display: flex;
    gap: 15px;
  }

  .btn {
    background: none;
    border: none;
    color: aliceblue;
  }

  .btn svg {
    background: none;
  }

  .carrossel {
    display: flex;
    overflow-x: hidden;
    scroll-behavior: smooth;
    gap: 25px;
  }
  .title {
    ${theme.getFontStyle("Poppins_400_medium")}
  }
`;
