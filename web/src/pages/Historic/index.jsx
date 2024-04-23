import { Footer, Navbar, Section } from "../../components";
import { Container, Board } from "./styles";

export function Historic() {
  return (
    <Container>
      <Navbar />
      <div className="content">
        <h1>Histórico de pedidos</h1>
        <Board>
          <h2 className="name ">Status</h2>
          <h2 className="name ">Código</h2>
          <h2 className="name">Detalhamento</h2>
          <h2 className="name ">Data e hora</h2>

          <div className="status">
            <div>
              <select name="seuSelect" id="seuSelect">
                <option value="opcao1">Pendente</option>
                <option value="opcao2">Opção 2</option>
                <option value="opcao3">Opção 3</option>
              </select>
            </div>
          </div>
          <div className="code">
            {" "}
            <p>00000004</p>
          </div>
          <div className="details">
            <p>
              1 x Salada Radish, 1 x Torradas de Parma, 1 x Chá de Canela, 1 x
              Suco de Maracujá
            </p>
          </div>
          <div className="data">
            {" "}
            <p>20/05 às 18h00</p>
          </div>
        </Board>
      </div>
      <Footer />
    </Container>
  );
}
