import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  background: ${theme.getColorStyle("DARK_1000")};
  ${theme.getFontStyle("Poppins_100_medium")}
  border-radius: 5px;
  padding: 5px 14px;
  color: ${theme.getColorStyle("LIGHT_100")};
`;
