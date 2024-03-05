import { Container } from "./styles";
import { Tag, Button } from "../index";
import img2 from "../../assets/image2.png";

import { IoMdRemove, IoMdAdd } from "react-icons/io";
import { useState } from "react";
export function Iten() {
  const [quantidade, setQuantidade] = useState("1");

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
  const valor = "25,50";
  return (
    <Container>
      <img src={img2} alt="" />
      <div className="description">
        <h1>Salada Ravanello</h1>
        <p>
          Rabanetes, folhas verdes e molho agridoce salpicados com gergelim. O
          pão naan dá um toque especial.
        </p>
        <div className="tags">
          <Tag title={"alface"} />
          <Tag title={"cebola"} />
          <Tag title={"pão naan"} />
          <Tag title={"pepino"} />
          <Tag title={"rabanete"} />
          <Tag title={"tomate"} />
        </div>
        <div className="btn-display">
          <button className="btn" onClick={handleButton} title="btn-remove">
            <IoMdRemove size={24} />
          </button>
          {quantidade > 9 ? <p>{quantidade}</p> : <p>0{quantidade}</p>}
          <button className="btn" onClick={handleButton} title="btn-add">
            <IoMdAdd size={24} />
          </button>
          <Button title={`incluir ∙ ${valor}`} />
        </div>
      </div>
    </Container>
  );
}
