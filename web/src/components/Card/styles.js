import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  /* border: aqua; */
  align-items: center;
  flex-direction: column;

  background: ${theme.getColorStyle("DARK_200")};

  border-radius: 5px;
  justify-content: space-around;
  padding: 30px;
  width: 300px;

  flex: none;

  position: relative;

  .header-btn {
    display: flex;
    background: none;
    position: absolute;
    top: 25px;
    right: 25px;
  }

  .img {
    background: none;
    border-radius: 50%;
    width: 160px;
    height: 160px;
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
    background: none;
    width: 100%;
    display: flex;
    overflow-x: hidden;
    padding: 15px 0 0 0;
    justify-content: space-around;

    > h1 {
      ${theme.getFontStyle("Poppins_300_bold")}
      color: ${theme.getColorStyle("LIGHT_300")};
      background: none;
      white-space: nowrap;
      transition: transform 3s linear;
    }
  }

  .transition:not(:hover) {
    transition: transform 0s linear;
    transform: translateX(0);
  }

  .transition:hover {
    transform: translateX(-100%);
  }

  .description {
    display: flex;
    flex-direction: column;
    width: 100%;
    ${theme.getFontStyle("Roboto_Smaller_normal")}
    color: ${theme.getColorStyle("LIGHT_400")};
    background: none;
    text-align: center;
    overflow-x: hidden;
  }

  .value {
    ${theme.getFontStyle("Roboto_Biggest_normal")}
    color: ${theme.getColorStyle("CAKE_200")};
    background: none;
  }
`;
