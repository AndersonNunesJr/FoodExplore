import { useState } from "react";
import { Footer, Navbar, Section } from "../../components";
import { Container, Board } from "./styles";
import { BsCircleFill } from "react-icons/bs";

export function Historic() {
  const [orderCondition, setOrderCondition] = useState([]);

  // const addOrderStatus = (status, orderId) => {
  //   setOrderCondition([...orderCondition, status]);
  // };
  // const addOrderStatus = (status, orderId) => {
  //   // Atualiza o estado orderCondition com o novo status
  //   setOrderCondition([{ id: orderId, status }]);
  // };
  const addOrderStatus = (status, orderId) => {
    // Verifica se já existe um objeto com o mesmo ID no array
    const existingIndex = orderCondition.findIndex(
      (item) => item.id === orderId
    );

    if (existingIndex !== -1) {
      // Se já existe um objeto com o mesmo ID, atualiza o status desse objeto
      const updatedOrderCondition = [...orderCondition];
      updatedOrderCondition[existingIndex].status = status;
      setOrderCondition(updatedOrderCondition);
    } else {
      // Se não existe um objeto com o mesmo ID, adiciona um novo objeto ao array
      setOrderCondition([...orderCondition, { id: orderId, status }]);
    }
  };

  console.log(orderCondition);
  return (
    <Container>
      {/* {orderCondition[0] === "Preparando" ? (
                  <BsCircleFill fill="orange" />
                ) : orderCondition[0] === "Entregue" ? (
                  <BsCircleFill fill="green" />
                ) : (
                  <BsCircleFill fill="red" />
                )} */}
      <Navbar />
      <div className="content">
        <h1>Histórico de pedidos</h1>
        <Board>
          <h2 className="name ">Status</h2>
          <h2 className="name ">Código</h2>
          <h2 className="name">Detalhamento</h2>
          <h2 className="name ">Data e hora</h2>

          <div className="status">
            <div className="heading">
              <div className="orderStatus">
                {/* {orderCondition.length > 0 ? (
    // Encontra o objeto com o ID correspondente
    const item = orderCondition.find(item => item.id === orderId);
    item && item.status === 'Pendente' ? (
      <BsCircleFill fill="red" />
    ) : item && item.status === 'Entregue' ? (
      <BsCircleFill fill="green" />
    ) : (
      <BsCircleFill fill="orange" />
    )
  ) : (
    <BsCircleFill fill="gray" />
  )} */}

                {orderCondition.length > 0 ? (
                  // Encontra o objeto com o ID correspondente
                  orderCondition.map((item) => {
                    if (item.id === orderId) {
                      return (
                        <div key={item.id}>
                          {item.status === "Pendente" ? (
                            <BsCircleFill fill="red" />
                          ) : item.status === "Entregue" ? (
                            <BsCircleFill fill="green" />
                          ) : (
                            <BsCircleFill fill="orange" />
                          )}
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })
                ) : (
                  <BsCircleFill fill="gray" />
                )}
                <select
                  name="seuSelect"
                  id="0001"
                  onChange={(e) => addOrderStatus(e.target.value, e.target.id)}
                >
                  <option value="Pendente">Pendente</option>
                  <option value="Entregue">Entregue</option>
                  <option value="Preparando">Preparando</option>
                </select>
              </div>
            </div>
            <div className="heading">
              <div className="orderStatus">
                <BsCircleFill />
                <select
                  name="seuSelect"
                  id="seuSelect"
                  onChange={(e) => setOrderCondition(e.target.value)}
                >
                  <option value="Pendente">Pendente</option>
                  <option value="opcao2">Opção 2</option>
                  <option value="opcao3">Opção 3</option>
                </select>
              </div>
            </div>
          </div>
          <div className="code">
            {" "}
            <p>00000004</p>
            <p>00000004</p>
            <p>00000004</p>
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
          </div>
        </Board>
      </div>
      <Footer />
    </Container>
  );
}
