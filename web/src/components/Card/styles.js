import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  border: aqua;
  align-items: center;
  flex-direction: column;

  background: ${theme.getColorStyle("DARK_200")};
  /* background: white; */
  border-radius: 5px;
  gap: 10px;
  padding: 20px;

  .btn-favorite {
    display: flex;
    width: 100%;
    background: none;
    justify-content: flex-end;
  }

  .img {
    background: none;
  }

  .btn-display {
    display: flex;
    gap: 15px;
    background: none;
  }

  .btn-display p {
    background: none;
    display: flex;
    align-items: center;
    ${theme.getFontStyle("Roboto_Big_bold")}
  }

  .btn {
    border: none;
    color: ${theme.getColorStyle("LIGHT_100")};
  }

  .btn svg {
    background: none;
  }

  .title {
    flex: none;
    ${theme.getFontStyle("Poppins_300_bold")}
    color: ${theme.getColorStyle("LIGHT_300")};
    background: none;
    width: 100%;
    text-align: center;
    min-width: 240px;
    max-width: 241px;
  }

  .description {
    ${theme.getFontStyle("Roboto_Smaller_normal")}
    color: ${theme.getColorStyle("LIGHT_400")};
    background: none;
    text-align: center;
    padding: 0 8px;
    width: 100%;
  }

  .value {
    ${theme.getFontStyle("Roboto_Biggest_normal")}
    color: ${theme.getColorStyle("CAKE_200")};
    background: none;
  }
`;
