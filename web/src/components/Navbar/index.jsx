import { Container } from "./styles";
import backgroundImg from "../../assets/Logo.png";
import { Input, Button } from "../index";
export function Navbar() {
  return (
    <Container>
      <img src={backgroundImg} alt="Logo" />
      <Input type="text" placeholder="Busque por pratos ou ingredientes" />
      <Button title="Meu pedido" />
      <button>aki</button>
    </Container>
  );
}
