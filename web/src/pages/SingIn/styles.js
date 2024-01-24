import styled from "styled-components"
import backgroundImg from "../../assets/name_parma400.png"

export const Container = styled.div`
    height:100vh;
    display: flex;
   
    
    >div{
        background: url(${backgroundImg}) no-repeat center center;
        height: 50%;
        width: 500px;
        background-color: green;
        border: red;
    }
`;