import { Button, Footer, Highlight, Navbar } from "../../components";
import { Container, Checkout, Form } from "./styles";
import img from "../../assets/image3.png";
import Pix from "../../assets/Pix.png";
import Credit from "../../assets/Credit.png";
import Qrcode from "../../assets/Qrcode.svg";
import { useState } from "react";

import { PiReceiptLight } from "react-icons/pi";

export function Payment() {
  const [methodPayment, setMethodPayment] = useState("pix");

  const amount = 1;
  const value = "25,00";
  const total = "25,00";

  const handleMethodPayment = (buttonTitle) => {
    setMethodPayment(buttonTitle);
  };

  const handlePayment = () => {};

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
          </div>
          <p>Total: {total}</p>
        </Checkout>
        <Form>
          <h2>Pagamento</h2>
          <div className="btn-pay">
            <button
              type="button"
              className={`pix ${methodPayment === "pix" ? "active" : ""}`}
              onClick={() => handleMethodPayment("pix")}
            >
              <img src={Pix} alt="" />
              Pix
            </button>
            <button
              type="button"
              className={`credit ${methodPayment === "credit" ? "active" : ""}`}
              onClick={() => handleMethodPayment("credit")}
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
                <label htmlFor="Número do cartão">Número do cartão</label>
                <input type="text" placeholder="0000 0000 0000 0000" />
                <div>
                  <label htmlFor="Validade">Validade</label>
                  <input type="text" placeholder="04/25" />
                  <label htmlFor="CVC">CVC</label>
                  <input type="text" placeholder="000" />
                </div>
                <Button title={"Finalizar pagamento"} icon={PiReceiptLight} />
              </form>
            )}
          </div>
        </Form>
      </div>
      <Footer />
    </Container>
  );
}
