import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding: 16px 75px;
  text-wrap: nowrap;
  background-color: ${theme.getColorStyle("DARK_600")};

  > a {
    background: none;
    color: ${theme.getColorStyle("LIGHT_300")};
    > img {
      height: 36px;
      background: transparent;
    }
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
