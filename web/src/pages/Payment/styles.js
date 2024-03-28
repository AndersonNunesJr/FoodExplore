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
      background-color: ${theme.getColorStyle("DARK_800")};
      border-radius: 8px 0 0 0;
      border: 1px solid ${theme.getColorStyle("LIGHT_600")};
    }

    .credit {
      background-color: ${theme.getColorStyle("DARK_800")};
      border-radius: 0 8px 0 0;
      border: 1px solid ${theme.getColorStyle("LIGHT_600")};
    }
  }
  .method {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 1px;

    border: 1px solid ${theme.getColorStyle("LIGHT_600")};
    border-top-style: none;
    border-radius: 0 0 8px 8px;

    > img {
      max-width: 300px;
      height: 300px;
    }
  }
`;
