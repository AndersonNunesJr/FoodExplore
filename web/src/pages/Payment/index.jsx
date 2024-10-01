import { Button, Footer, Highlight, Navbar } from "../../components";
import { Container, Checkout, Form } from "./styles";
import {
  pix,
  credit,
  delivered,
  qrcode,
  analyzing,
  requestIsComing,
  checked
} from "../../assets/_index";

import { useRef, useState } from "react";

import { PiReceiptLight } from "react-icons/pi";

import { api } from "../../services/api.js";
import { useAuth } from "../../hooks/auth";

export function Payment() {
  const [methodPayment, setMethodPayment] = useState("pix");
  const [cardNumber, setCardNumber] = useState("");
  const refTimer = useRef(null);
  const [analyzingPayment, setAnalyzingPayment] = useState(false);
  const [checkedAnalysis, setCheckedAnalysis] = useState(false);
  const [coming, setComing] = useState(false);
  const [orderDelivered, setOrderDelivered] = useState(false);

  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  const img = "*";

  const nameLoja = null;

  const Qrcode = qrcode;
  // ? `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${nameLoja}`
  // : qrcode;

  const amount = 1;
  const value = "25,00";
  const total = "25,00";

  const handleMethodPayment = (buttonTitle) => {
    setMethodPayment(buttonTitle);
  };

  const handlePayment = () => {
    setAnalyzingPayment(true);
    if (refTimer.current) {
      clearTimeout(refTimer.current);
    }
    refTimer.current = setTimeout(() => {
      setAnalyzingPayment(false);
      setCheckedAnalysis(true);
    }, 3000);
    refTimer.current = setTimeout(() => {
      setCheckedAnalysis(false);
      setComing(true);
    }, 4000);
    refTimer.current = setTimeout(() => {
      setComing(false);
      setOrderDelivered(true);
    }, 10000);
  };

  async function fetchFavorites() {
    try {
      const response = await api.get(`/favorites/${user.id}`);
      setFavorites(response.data.result.products);
    } catch (error) {
      console.error("Erro ao buscar produtos favoritos:", error);
    }
  }

  return (
    <Container>
      <Navbar />
      <div className="requests">
        <Checkout>
          <h2>Meu pedido</h2>
          <div className="list">
            {/* {favorites.map((favorite) => (
              <Highlight
                key={String(favorite.id)}
                data={favorite}
                buttonText="Remover dos Favoritos"
              />
            ))} */}
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
              <img src={pix} alt="" />
              Pix
            </button>
            <button
              type="button"
              className={`credit ${methodPayment === "credit" ? "active" : ""}`}
              onClick={() => handleMethodPayment("credit")}
            >
              <img src={credit} alt="" />
              Crédito
            </button>
          </div>
          <div className="method">
            {analyzingPayment === true ? (
              <>
                <img src={analyzing} alt="" className="status" />
                <p>Aguardando pagamento no caixa!</p>
              </>
            ) : checkedAnalysis === true ? (
              <>
                <img src={checked} alt="" className="status" />
                <p>Pagamento aprovado!</p>
              </>
            ) : coming === true ? (
              <>
                <img src={requestIsComing} alt="" className="status" />
                <p>Pedido a caminho!</p>
              </>
            ) : orderDelivered === true ? (
              <>
                <img src={delivered} alt="" className="status" />
                <p>Pedido entregue!</p>
              </>
            ) : methodPayment === "pix" ? (
              <img src={Qrcode} alt="" />
            ) : (
              <form>
                <label htmlFor="Número do cartão">Número do cartão</label>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                <div>
                  <label htmlFor="Validade">Validade</label>
                  <input type="text" placeholder="04/25" />
                  <label htmlFor="CVC">CVC</label>
                  <input type="text" placeholder="000" />
                </div>
                <Button
                  title={"Finalizar pagamento"}
                  icon={PiReceiptLight}
                  onClick={handlePayment}
                />
              </form>
            )}
          </div>
        </Form>
      </div>
      <Footer />
    </Container>
  );
}
