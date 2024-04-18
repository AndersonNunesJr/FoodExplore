import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  color: ${theme.getColorStyle("LIGHT_100")};

  .requests {
    display: grid;
    justify-items: center;
    grid-template-columns: 1fr 1fr;
    ${theme.getFontStyle("Poppins_400_medium")}
    font-size: 20px;
  }
`;

export const Checkout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .list {
    display: flex;
    flex-direction: column;
    padding: 5px 0;
    gap: 10px;
    overflow-y: auto;
    max-height: 420px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  .btn-pay {
    margin-top: 20px;
    display: flex;

    > button {
      width: 250px;
      height: 80px;

      display: flex;
      align-items: center;
      justify-content: center;

      gap: 8px;

      color: ${theme.getColorStyle("LIGHT_100")};
      border: none;
      > img {
        background: none;
      }
    }

    .pix {
      background-color: ${theme.getColorStyle("DARK_400")};
      border-radius: 8px 0 0 0;
      border: 1px solid ${theme.getColorStyle("LIGHT_600")};
    }
    .pix.active {
      background-color: ${theme.getColorStyle("DARK_800")};
    }
    .credit {
      background-color: ${theme.getColorStyle("DARK_400")};
      border-radius: 0 8px 0 0;
      border: 1px solid ${theme.getColorStyle("LIGHT_600")};
    }
    .credit.active {
      background-color: ${theme.getColorStyle("DARK_800")};
    }
  }
  .method {
    width: 100%;
    height: 320px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    color: ${theme.getColorStyle("LIGHT_400")};

    padding: 1px;

    border: 1px solid ${theme.getColorStyle("LIGHT_600")};
    border-top-style: none;
    border-radius: 0 0 8px 8px;

    > img {
      margin: 25px 0;
      max-width: 270px;
      height: 270px;
    }
    .status {
      height: 100px;
    }

    .status-container . {
      
    }

    > form {
      margin: 50px 0;
      width: 100%;
      display: flex;
      flex-direction: column;

      padding: 0 40px;

      ${theme.getFontStyle("Roboto_Small_normal")}

      > input {
        height: 40px;
        margin-bottom: 24px;
        margin-top: 5px;

        padding: 0 0 0 15px;

        border-radius: 5px;
        border: 1px solid ${theme.getColorStyle("LIGHT_600")};
        color: ${theme.getColorStyle("LIGHT_400")};
      }
      > div {
        display: grid;
        grid-template-columns: 1fr 1fr;

        gap: 0 15px;

        > input {
          height: 40px;
          margin-bottom: 24px;
          margin-top: 5px;

          padding: 0 0 0 15px;

          border-radius: 5px;
          border: 1px solid ${theme.getColorStyle("LIGHT_600")};
          color: ${theme.getColorStyle("LIGHT_400")};
        }
        :nth-child(3) {
          grid-row: 1;
          grid-column: 2;
        }
      }
      > button {
        height: 50px;
      }
    }
  }
`;
