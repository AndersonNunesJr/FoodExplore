import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  .description {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .description h1 {
    color: ${theme.getColorStyle("LIGHT_300")};
    ${theme.getFontStyle("Poppins_500_medium")}
  }
  .description p {
    width: 600px;
    color: ${theme.getColorStyle("LIGHT_300")};
    ${theme.getFontStyle("Poppins_200_medium")}
  }
  .tags {
    display: flex;
    gap: 10px;
  }
  .btn-display {
    display: flex;
    width: 50%;
    gap: 15px;
  }
  .btn-display p {
    width: fit-content;
  }
  .btn {
    background: none;
    border: none;
    color: aliceblue;
  }
`;
