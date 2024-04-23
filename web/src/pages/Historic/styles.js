import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .content {
    height: 100%;
    padding: 32px 75px 50px;

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

  p {
    border-bottom: solid 2px ${theme.getColorStyle("DARK_1000")};
    padding: 20px 0 20px 10px;
  }

  .name {
    display: flex;
    align-items: center;
    border: solid 2px ${theme.getColorStyle("DARK_1000")};

    padding: 5px 10px;

    ${theme.getFontStyle("Roboto_Smaller_bold")}
    color: ${theme.getColorStyle("LIGHT_300")};
  }

  .name:nth-of-type(1) {
    border-radius: 8px 0 0 0;
  }
  .name:nth-of-type(2) {
    border-left: 0;
    border-right: 0;
  }
  .name:nth-of-type(4) {
    border-radius: 0 8px 0 0;
    border-left: 0;
  }

  .status {
    border-right: solid 2px ${theme.getColorStyle("DARK_1000")};
    border-left: solid 2px ${theme.getColorStyle("DARK_1000")};

    ${theme.getFontStyle("Roboto_Smaller_normal")}
    color: ${theme.getColorStyle("LIGHT_400")};

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;

      padding: 10px 15px;

      border-bottom: solid 2px ${theme.getColorStyle("DARK_1000")};

      > select {
        width: 100%;
        /* height: 100%; */

        background-color: ${theme.getColorStyle("DARK_800")};

        color: ${theme.getColorStyle("LIGHT_400")};
        outline: none;
        border: none;
        > option {
          padding: 10px 0 10px 10px;
        }
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
    border-right: solid 2px ${theme.getColorStyle("DARK_1000")};

    ${theme.getFontStyle("Roboto_Smaller_normal")}
    color: ${theme.getColorStyle("LIGHT_400")};
  }
`;
