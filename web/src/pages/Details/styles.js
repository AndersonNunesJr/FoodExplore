import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
  .back {
    width: fit-content;
    margin: 0 0 15px 50px;
    display: flex;
    background: transparent;
    color: ${theme.getColorStyle("LIGHT_100")};
    align-items: center;
  }
`;
