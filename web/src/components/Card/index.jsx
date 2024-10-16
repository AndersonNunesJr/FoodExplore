import { Button } from "../Button";
import { Container } from "./styles";
import { IoMdRemove, IoMdAdd, IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { PiPencilSimple } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";

export function Card({ data, ...rest }) {
  const [quantidade, setQuantidade] = useState("1");
  const [products, setProducts] = useState([]);
  const titleTransition = useRef(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const productsId = data.id;
  const isAdmin = user.role;

  const foundProduct = products.some((product) => product.id === productsId);

  const handleButton = (e) => {
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

  function handleButtonIncluir() {
    let amountsToBePaid = localStorage.getItem("@Foodexplore:amountsToBePaid");

    if (amountsToBePaid) {
      amountsToBePaid = JSON.parse(amountsToBePaid);
    } else {
      amountsToBePaid = [];
    }
    const storeIndex = amountsToBePaid.findIndex(
      (item) => item.storage === data.marketplace.storename
    );

    if (storeIndex !== -1) {
      const productIndex = amountsToBePaid[storeIndex].products.findIndex(
        (item) => item.product === data.title
      );

      if (productIndex !== -1) {
        amountsToBePaid[storeIndex].products[productIndex].amount +=
          Number(quantidade);
      } else {
        amountsToBePaid[storeIndex].products.push({
          product: data.title,
          amount: Number(quantidade)
        });
      }
    } else {
      amountsToBePaid.push({
        storage: data.marketplace.storename,
        products: [
          {
            product: data.title,
            amount: Number(quantidade)
          }
        ]
      });
    }

    localStorage.setItem(
      "@Foodexplore:amountsToBePaid",
      JSON.stringify(amountsToBePaid)
    );
  }

  async function fetchFavorites() {
    try {
      const response = await api.get(`/favorites/${user.id}`);
      setProducts(response.data.result.products);
    } catch (error) {
      console.error("Erro ao buscar produtos favoritos:", error);
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
    await api.delete(`/favorites/${user.id}/delete`, {
      data: { productsId: productId }
    });
    fetchFavorites();
  };

  const handleButtonFavoritesAdd = async (productId) => {
    try {
      await api.post(`/favorites/${user.id}/create`, {
        productsId: productId
      });
    } catch (error) {
      console.error("Erro ao buscar produtos favoritos:", error);
    }
    fetchFavorites();
  };

  const handleButtonEditDish = (productId) => {
    navigate("/edit", { state: { data } });
    console.log(`Editando prato com ID: ${productId}`);
  };

  return (
    <Container>
      {isAdmin !== "admin" ? (
        <>
          <div className="header-btn">
            {foundProduct ? (
              <button
                onClick={() => handleButtonFavoritesDelete(productsId)}
                title="btn-favorite"
                className="btn"
                type="button"
              >
                <IoMdHeart size={24} />
              </button>
            ) : (
              <button
                onClick={() => handleButtonFavoritesAdd(productsId)}
                title="btn-favorite"
                className="btn"
                type="button"
              >
                <IoMdHeartEmpty size={24} />
              </button>
            )}
          </div>
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
            <Button title={"incluir"} onClick={handleButtonIncluir} />
          </div>
        </>
      ) : (
        <>
          <div className="header-btn">
            <button
              onClick={() => handleButtonEditDish(productsId)}
              title="btn-edit-dish"
              className="btn"
              type="button"
            >
              <PiPencilSimple size={24} />
            </button>
          </div>
          <img src={data.productImg} alt={data.title} className="img" />
          <div className="title">
            <h1 ref={titleTransition}>
              {data.title}
              {" >"}
            </h1>
          </div>
          <p className="description">{data.description}</p>
          <h2 className="value">R$ {data.price}</h2>
        </>
      )}
    </Container>
  );
}
