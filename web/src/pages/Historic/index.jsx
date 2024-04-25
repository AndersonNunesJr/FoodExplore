import { useState } from "react";
import { Footer, Navbar, Section } from "../../components";
import { Container, Board } from "./styles";
import { BsCircleFill } from "react-icons/bs";

export function Historic() {
  const [orderCondition, setOrderCondition] = useState([]);
  const [orderId, setOrderId] = useState([..."1"]);
  const isAdmin = false;

  // orderId  é um array com todos os codigos de pedidos entao passar a condiçao orderId.length > 0 no local marcado

  const addOrderStatus = (status, orderIndexId) => {
    const existingIndex = orderCondition.findIndex(
      (item) => item.id === orderIndexId
    );
    const existingIndexOrderId = orderId.findIndex(
      (item) => item.id === orderIndexId
    );
    if (existingIndex !== -1 && existingIndexOrderId !== -1) {
      const updatedOrderCondition = [...orderCondition];
      const updatedOrderId = [...orderId];

      updatedOrderCondition[existingIndex].status = status;
      updatedOrderId[existingIndexOrderId].id = orderIndexId;

      setOrderCondition(updatedOrderCondition);
      setOrderId(updatedOrderId);
    } else {
      setOrderCondition([...orderCondition, { id: orderIndexId, status }]);
      setOrderId([...orderCondition, { id: orderIndexId }]);
    }
  };

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

          {/* A CONDIÇAO DO ORDERID DEVE SER ULTILIZADA ATE DATA */}
          {/* <div className="table"></div> */}

          <div className="status">
            {!isAdmin
              ? orderId.length > 0 && (
                  <div className="heading">
                    <div className="orderStatus">
                      <select
                        name="seuSelect"
                        id="0002"
                        onChange={(e) =>
                          addOrderStatus(e.target.value, e.target.id)
                        }
                      >
                        <option value="Pendente">Pendente</option>
                        <option value="Entregue">Entregue</option>
                        <option value="Preparando">Preparando</option>
                      </select>
                      {orderCondition.map(
                        (item) =>
                          item && (
                            <BsCircleFill
                              key={item.id}
                              className={`${item.status}`}
                            />
                          )
                      )}
                    </div>
                  </div>
                )
              : orderId.length > 0 && (
                  <div className="heading">
                    <div className="orderStatus">
                      {orderCondition.map(
                        (item) =>
                          item && (
                            <div key={item.id}>
                              <p>{item.status}</p>
                              <BsCircleFill className={`${item.status}`} />
                            </div>
                          )
                      )}
                    </div>
                  </div>
                )}
          </div>

          <div className="code">
            {orderId.length > 0 && (
              <>
                {orderId.map((item) => item && <p key={item.id}>{item.id}</p>)}
              </>
            )}
          </div>
          <div className="details">
            <p>
              1 x Salada Radish, 1 x Torradas de Parma, 1 x Chá de Canela, 1 x
              Suco de Maracujá
            </p>
            <p>
              1 x Salada Radish, 1 x Torradas de Parma, 1 x Chá de Canela, 1 x
              Suco de Maracujá
            </p>
            <p>00000004</p>
          </div>
          <div className="data">
            {" "}
            <p>20/05 às 18h00</p>
            <p>20/05 às 18h00</p>
            <p>00000004</p>
            <p>00000004</p>
            <p>00000004</p>
            {/* <p>00000004</p> */}
            {/* <p>00000004</p> */}
          </div>
        </Board>
      </div>
      <Footer />
    </Container>
  );
}
