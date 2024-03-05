import { Footer, Navbar, Section, Iten } from "../../components";
import { Container } from "./styles";
import { PiCaretLeftBold } from "react-icons/pi";

export function Details() {
  return (
    <Container>
      <Navbar />
      <Section className="details">
        <a href="/" className="back">
          <PiCaretLeftBold size={24} />
          <p>Voltar</p>
        </a>
        <Iten />
      </Section>
      <Footer />
    </Container>
  );
}
