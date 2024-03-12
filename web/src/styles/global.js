import { createGlobalStyle } from "styled-components";
import theme from "./theme";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: ${theme.getColorStyle("DARK_400")};
    /* background-color: darkgray; */
  }
  a {
    text-decoration:none;
   }
  button, a {

    cursor: pointer;
    transition: filter 0.2s;  
    }
    button:hover, a:hover {
        filter: brightness(0.9);
    }
    
`;
