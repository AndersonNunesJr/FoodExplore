import { Footer, Highlight, Navbar } from "../../components";
import { Container, Checkout, Form } from "./styles";
import img from "../../assets/image3.png";
import Pix from "../../assets/Pix.png";
import Credit from "../../assets/Credit.png";
import Qrcode from "../../assets/Qrcode.svg";
import { useState } from "react";

export function Payment() {
  const [methodPayment, setMethodPayment] = useState("pix");

  const amount = 1;
  const value = "25,00";
  const total = "25,00";

  const handlePayment = (buttonTitle) => {
    setMethodPayment(buttonTitle);
  };

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
            <button
              type="button"
              className={`pix ${methodPayment === "pix" ? "active" : ""}`}
              onClick={() => handlePayment("pix")}
            >
              <img src={Pix} alt="" />
              Pix
            </button>
            <button
              type="button"
              className={`credit ${methodPayment === "credit" ? "active" : ""}`}
              onClick={() => handlePayment("credit")}
            >
              <img src={Credit} alt="" />
              Crédito
            </button>
          </div>
          <div className="method">
            {methodPayment === "pix" ? (
              <img src={Qrcode} alt="" />
            ) : (
              <form>
                <label htmlFor=""></label>
              </form>
            )}
          </div>
        </Form>
      </div>
      <Footer />
    </Container>
  );
}
