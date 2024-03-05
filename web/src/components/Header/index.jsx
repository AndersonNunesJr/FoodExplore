import { Container } from "./styles";
import imgEggPng from "../../assets/pngegg1.png";
export function Header() {
  return (
    <Container>
      <img src={imgEggPng} alt="" />
      <div>
        <h1>Sabores inigualáveis</h1>
        <p>Sinta o cuidado do preparo com ingredientes selecionados</p>
      </div>
    </Container>
  );
}
