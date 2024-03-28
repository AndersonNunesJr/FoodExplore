import { Footer, Highlight, Navbar } from "../../components";
import { Container, Checkout, Form } from "./styles";
import img from "../../assets/image3.png";

export function Payment() {
  const amount = 1;
  const value = "25,00";
  const total = "25,00";
  return (
    <Container>
      <Navbar />
      <div className="requests">
        <Checkout>
          <h2>Meu pedido</h2>
          <div className="list">
            <Highlight
              img={img}
              title="Salada Radish"
              value={value}
              amount={amount}
            />
            <Highlight
              img={img}
              title="Salada Radish"
              value={value}
              amount={amount}
            />
            <Highlight
              img={img}
              title="Salada Radish"
              value={value}
              amount={amount}
            />
            <Highlight
              img={img}
              title="Salada Radish"
              value={value}
              amount={amount}
            />
            <Highlight
              img={img}
              title="Salada Radish"
              value={value}
              amount={amount}
            />
            <Highlight
              img={img}
              title="Salada Radish"
              value={value}
              amount={amount}
            />
          </div>
          <p>Total: {total}</p>
        </Checkout>
        <Form>
          <h2>Pagamento</h2>
          <div className="btn-pay">
            <button>Pix</button>
            <button>Crédito</button>
          </div>
          <div className="method"></div>
        </Form>
      </div>
      <Footer />
    </Container>
  );
}
