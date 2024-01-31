import { Container } from "./styles";
import logoFooter from "../../assets/LogoFooter.png";
export function Footer() {
  return (
    <Container>
      <img src={logoFooter} alt="Logo" />
      <p>© 2023 - Todos os direitos reservados.</p>
    </Container>
  );
}
