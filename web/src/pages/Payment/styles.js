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
    > button {
      width: 300px;
      height: 80px;

      color: ${theme.getColorStyle("LIGHT_100")};
      background-color: ${theme.getColorStyle("DARK_800")};
      border: none;
      border-radius: 8px 8px 0 0;
      /* border: 1px solid ${theme.getColorStyle("LIGHT_600")}; */
    }
  }
  .method {
    width: 100%;
    height: 100%;
    padding: 1px;
    border: 1px solid ${theme.getColorStyle("LIGHT_600")};
    border-radius: 8px;
  }
`;
