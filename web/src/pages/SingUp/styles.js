import styled from "styled-components";
import theme from "../../styles/theme";
import backgroundImg from "../../assets/Logo.png";

export const Container = styled.div`
  height: 100vh;
  display: grid;
  width: 100%;
  align-items: stretch;
  grid-template-columns: 50% auto;
`;
export const Form = styled.form`
  padding: 32px 64px;
  height: max-content;
  margin: auto;
  /* width: 60%; */

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  border-radius: 16px;
  background-color: ${theme.getColorStyle("DARK_700")};

  > button {
    margin: 8px 0 0;
  }
  > h1 {
    text-align: center;
    color: ${theme.getColorStyle("LIGHT_100")};
    background: none;
    ${theme.getFontStyle("Poppins_400_medium")}
  }
  label {
    color: ${theme.getColorStyle("LIGHT_400")};
    ${theme.getFontStyle("Roboto_Small_normal")};
    margin: 12px 0 0;
    background: none;
  }
  > a {
    width: fit-content;
    margin: 24px auto 0;
    color: ${theme.getColorStyle("LIGHT_100")};
    background: none;
  }
  > div {
    width: 100%;
  }
  .userRole {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    background: none;
  }
`;
export const Background = styled.div`
  flex: 1;
  background: url(${backgroundImg}) no-repeat center center;
`;
