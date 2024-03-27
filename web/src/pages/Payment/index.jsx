import { Footer, Navbar } from "../../components";
import { Container, Checkout } from "./styles";

export function Payment() {
  return (
    <Container>
      <Navbar />
      <Checkout>
        <div className="requests">
          <h2>Meus pedido</h2>
        </div>
        <div className="pay">
          <h2>Pagamento</h2>
        </div>
      </Checkout>
      <Footer />
    </Container>
  );
}
