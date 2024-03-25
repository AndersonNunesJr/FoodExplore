import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  color: ${theme.getColorStyle("LIGHT_300")};

  display: flex;
  flex-direction: column;
  gap: 25px;
  margin: 50px;

  .title-container {
    ${theme.getFontStyle("Poppins_400_medium")}
    z-index: 3;
  }

  > div {
    display: flex;
    gap: 15px;
  }

  .btn {
    background: none;
    border: none;
    color: ${theme.getColorStyle("LIGHT_100")};
  }

  .btn svg {
    background: none;
  }

  .carrossel {
    display: flex;
    overflow-x: hidden;
    gap: 25px;
  }
  .btn-direction {
    display: flex;
    align-items: center;
  }
`;
