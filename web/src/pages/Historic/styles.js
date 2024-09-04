import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .content {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 32px 75px 50px;
    overflow-y: hidden;

    > h1 {
      margin-bottom: 32px;
      ${theme.getFontStyle("Poppins_400_medium")}
      color: ${theme.getColorStyle("LIGHT_300")};
    }
  }
`;

export const Board = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr 4fr 1fr;
  grid-template-rows: 60px auto;
  height: 100%;
  overflow-y: auto;
  margin: 0 6px;
  border: solid 2px ${theme.getColorStyle("DARK_1000")};
  border-radius: 8px 8px 0 0;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.getColorStyle("LIGHT_700")};
    border-radius: 5px;
  }

  .table {
    grid-column: 1 / span 4;
    border: solid 2px ${theme.getColorStyle("DARK_1000")};
    border-top: none;
  }

  p {
    border-bottom: solid 2px ${theme.getColorStyle("DARK_1000")};
    padding: 20px 0 20px 10px;
  }

  .name {
    display: flex;
    align-items: center;
    border-bottom: solid 2px ${theme.getColorStyle("DARK_1000")};

    padding: 5px 10px;

    ${theme.getFontStyle("Roboto_Smaller_bold")}
    color: ${theme.getColorStyle("LIGHT_300")};
  }

  .name:nth-of-type(1) {
    border-right: solid 2px ${theme.getColorStyle("DARK_1000")};
  }

  .name:nth-of-type(3) {
    border-right: solid 2px ${theme.getColorStyle("DARK_1000")};
    border-left: solid 2px ${theme.getColorStyle("DARK_1000")};
  }

  .status {
    border-right: solid 2px ${theme.getColorStyle("DARK_1000")};
    /* border-left: solid 2px ${theme.getColorStyle("DARK_1000")}; */

    ${theme.getFontStyle("Roboto_Smaller_normal")}
    line-height: normal;
    color: ${theme.getColorStyle("LIGHT_400")};

    .heading {
      display: flex;
      align-items: center;
      justify-content: center;

      border-bottom: solid 2px ${theme.getColorStyle("DARK_1000")};
      padding: 10px 0;
    }

    .orderStatus {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row-reverse;

      gap: 8px;

      padding: 12px 16px;
      background-color: ${theme.getColorStyle("DARK_900")};

      > svg {
        background: none;
        border-top: solid 2px #0d1d25;
      }
      > p {
        width: 100%;

        padding: 0;
        background: none;

        color: ${theme.getColorStyle("LIGHT_400")};

        border-top: solid 2px #0d1d25;
        border-bottom: none;
      }
      > select {
        width: 100%;

        background: none;

        color: ${theme.getColorStyle("LIGHT_400")};

        outline: none;
        border: solid 1px transparent;
      }
      .Pendente {
        fill: ${theme.getColorStyle("TOMATO_300")};
      }
      .Entregue {
        fill: ${theme.getColorStyle("MINT_100")};
      }
      .Preparando {
        fill: ${theme.getColorStyle("CARROT_100")};
      }
    }
  }

  .code {
    ${theme.getFontStyle("Roboto_Smaller_normal")}
    color: ${theme.getColorStyle("LIGHT_400")};
  }
  .details {
    border-right: solid 2px ${theme.getColorStyle("DARK_1000")};
    border-left: solid 2px ${theme.getColorStyle("DARK_1000")};

    ${theme.getFontStyle("Roboto_Smaller_normal")}
    color: ${theme.getColorStyle("LIGHT_400")};
  }
  .data {
    /* border-right: solid 2px ${theme.getColorStyle("DARK_1000")}; */

    ${theme.getFontStyle("Roboto_Smaller_normal")}
    color: ${theme.getColorStyle("LIGHT_400")};
  }
`;
