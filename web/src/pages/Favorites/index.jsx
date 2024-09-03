import { Footer, Navbar, Highlight } from "../../components";
import { Container } from "./styles";

export function Favorites() {
  return (
    <Container>
      <Navbar />
      <div className="content">
        <h1>Histórico de pedidos</h1>
        <div className="table">
          <Highlight
            img={"*"}
            title="Salada Radish"
            buttonText="Remover dos Favoritos"
          />
        </div>
      </div>
      <Footer />
    </Container>
  );
}
