import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 16px 0;
  gap: 32px;

  background-color: ${theme.getColorStyle("DARK_600")};

  > img {
    height: 36px;
    background: transparent;
  }
  .Signout {
    background: none;
    color: ${theme.getColorStyle("LIGHT_100")};
    border: none;
    width: fit-content;
    display: flex;
  }
  .Signout svg {
    background: none;
  }
`;
