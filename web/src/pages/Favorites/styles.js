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
    .table {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      grid-template-rows: 60px;
      row-gap: 32px;
      height: 100%;
      overflow-y: auto;
      border: solid 2px ${theme.getColorStyle("DARK_1000")};
      border-radius: 8px;
      padding: 10px;

      &::-webkit-scrollbar {
        width: 5px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: ${theme.getColorStyle("LIGHT_700")};
        border-radius: 5px;
      }
    }
  }
`;
