import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: blue;
  }
   body{
    background: ${({ theme }) => theme.COLORS.TOMATO_400};
    color: ${({ theme }) => theme.COLORS.CAKE_200};
    
}
`;
