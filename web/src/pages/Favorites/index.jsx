import { Footer, Navbar, Highlight } from "../../components";
import { Container } from "./styles";
import img from "../../assets/image3.png";

export function Favorites() {
  return (
    <Container>
      <Navbar />
      <Highlight
        img={img}
        title="Salada Radish"
        buttonText="Remover dos Favoritos"
      />
      <Footer />
    </Container>
  );
}
