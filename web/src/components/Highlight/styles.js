import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  gap: 15px;

  img {
    width: 60px;
    height: 60px;
  }
  .head {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 5px;

    .heading {
      display: flex;
      gap: 5px;
      ${theme.getFontStyle("Poppins_200_medium")}
      >p {
        color: ${theme.getColorStyle("LIGHT_400")};
      }
      > span {
        ${theme.getFontStyle("Roboto_Smallest_normal")}
        color: ${theme.getColorStyle("LIGHT_400")};
        align-content: center;
      }
    }

    .excluir {
      border: none;
      color: ${theme.getColorStyle("TOMATO_400")};
    }
  }
`;
