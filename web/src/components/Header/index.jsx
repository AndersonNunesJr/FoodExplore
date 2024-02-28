import { Container } from "./styles";
import imgEggPng from "../../assets/pngegg1.png";
export function Header() {
  return (
    <Container>
      <img src={imgEggPng} alt="" />
      <div>
        <h2>Sabores inigualáveis</h2>
        <p>Sinta o cuidado do preparo com ingredientes selecionados</p>
      </div>
    </Container>
  );
}
