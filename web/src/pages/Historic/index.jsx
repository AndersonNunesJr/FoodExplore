import { Footer, Navbar, Section } from "../../components";
import { Container, Board } from "./styles";

export function Historic() {
  return (
    <Container>
      <Navbar />
      <h1>Histórico de pedidos</h1>
      <Board>
        <h2 className="name left">Status</h2>
        <h2 className="name">Código</h2>
        <h2 className="name">Detalhamento</h2>
        <h2 className="name right">Data e hora</h2>

        <div className="status">
          <p>dsad</p>
          <p>dasdas</p>
          <p>dasdsad</p>
          <p>adsdasd</p>
        </div>
        <div className="code">
          {" "}
          <p>dsad</p>
          <p>dasdas</p>
          <p>dasdsad</p>
          <p>adsdasd</p>
        </div>
        <div className="details">
          {" "}
          <p>dsad</p>
          <p>dasdas</p>
          <p>dasdsad</p>
          <p>adsdasd</p>
        </div>
        <div className="data">
          {" "}
          <p>dsad</p>
          <p>dasdas</p>
          <p>dasdsad</p>
          <p>adsdasd</p>
        </div>
      </Board>
      <Footer />
    </Container>
  );
}
