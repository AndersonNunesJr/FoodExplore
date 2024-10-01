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
    width: 100px;
    flex-direction: column;
    justify-content: flex-end;
    overflow-x: hidden;

    .heading {
      display: flex;
      justify-content: space-around;

      ${theme.getFontStyle("Poppins_200_medium")}

      > p {
        color: ${theme.getColorStyle("LIGHT_400")};
        background: none;
        display: flex;
        justify-content: space-around;
        white-space: nowrap;
        transition: transform 6s linear;
      }

      .transition:not(:hover) {
        transition: transform 0s linear;
        transform: translateX(0);
      }

      .transition:hover {
        transform: translateX(-100%);
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
