import { Footer, Navbar, Section } from "../../components";
import { Container } from "./styles";

export function Historic() {
  return (
    <Container>
      <Navbar />
      <Section>
        <h1>Histórico de pedidos</h1>
      </Section>

      <Footer />
    </Container>
  );
}
