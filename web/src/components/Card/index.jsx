import { Button } from "../Button";
import { Container } from "./styles";
import { IoMdRemove, IoMdAdd, IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";

export function Card({ data, ...rest }) {
  const [quantidade, setQuantidade] = useState("1");
  const [products, setProducts] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const titleTransition = useRef(null);
  const { user } = useAuth();
  const productsId = data.id;

  const foundProduct = products.some((product) => product.id === productsId);

  const handleButton = async (e) => {
    const buttonTitle = e.currentTarget.title;
    if (buttonTitle === "btn-add") {
      setQuantidade(Number(quantidade) + 1);
    }
    if (buttonTitle === "btn-remove") {
      if (Number(quantidade) > 1) {
        setQuantidade(Number(quantidade) - 1);
      }
    }
  };

  async function fetchFavorites() {
    try {
      const response = await api.get(`/favorites/${user.id}`);
      setProducts(response.data.result.products);
    } catch (error) {
      // console.error("Erro ao buscar produtos favoritos:", error);
    }
  }

  useEffect(() => {
    if (titleTransition.current) {
      if (titleTransition.current.offsetWidth > 254) {
        titleTransition.current.setAttribute("class", "transition");
      }
    }

    fetchFavorites();
  }, [user]);

  const handleButtonFavoritesDelete = async (productId) => {
    console.log(`Button clicked for product: ${productId},  >DELETED<`);
    setIsTyping(!isTyping);

    await api.delete(`/favorites/${user.id}/delete`, {
      data: { productsId: productId }
    });
  };

  const handleButtonFavoritesAdd = async (productId) => {
    console.log(`Button clicked for product: ${productId},  >ADD<`);
    setIsTyping(!isTyping);
    try {
      await api.post(`/favorites/${user.id}/create`, {
        productsId: productId
      });
    } catch (error) {
      console.error("Erro ao buscar produtos favoritos:", error);
    }
  };

  return (
    <Container>
      {products.map((product) => (
        <div className="btn-favorite" key={product.id}>
          {productsId === product.id ? (
            <button
              onClick={() => handleButtonFavoritesDelete(productsId)}
              title="btn-favorite"
              className="btn"
              type="button"
            >
              <IoMdHeart size={24} /* coraçao */ />
            </button>
          ) : null}
        </div>
      ))}
      {!foundProduct ? (
        <div className="btn-favorite">
          <button
            onClick={() => handleButtonFavoritesAdd(productsId)}
            title="btn-favorite"
            className="btn"
            type="button"
          >
            <IoMdHeartEmpty size={24} /* sem coraçao */ />
          </button>
        </div>
      ) : null}

      <img src={data.productImg} alt={data.title} className="img" />
      <div className="title">
        <h1 ref={titleTransition}>
          {data.title}
          {" >"}
        </h1>
      </div>
      <p className="description">{data.description}</p>
      <h2 className="value">R$ {data.price}</h2>
      <div className="btn-display">
        <button
          className="btn"
          onClick={handleButton}
          title="btn-remove"
          type="button"
        >
          <IoMdRemove size={24} />
        </button>
        {quantidade > 9 ? <p>{quantidade}</p> : <p>0{quantidade}</p>}
        <button
          className="btn"
          onClick={handleButton}
          title="btn-add"
          type="button"
        >
          <IoMdAdd size={24} />
        </button>
        <Button title={"incluir"} />
      </div>
    </Container>
  );
}
