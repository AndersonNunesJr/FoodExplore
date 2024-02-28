import { Navbar, Footer, Section, Header } from "../../components";

import { Container } from "./styles";
export function Home() {
  return (
    <Container>
      <Navbar />
      <Section>
        <Header />
      </Section>
      <Footer />
    </Container>
  );
}
