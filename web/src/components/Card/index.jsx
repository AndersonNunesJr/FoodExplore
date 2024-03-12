import { Button } from "../Button";
import { Container } from "./styles";
import { IoMdRemove, IoMdAdd, IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { useState } from "react";

export function Card({ title, description, value, img, imgText }) {
  const [quantidade, setQuantidade] = useState("1");
  const [isTyping, setIsTyping] = useState(false);

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
    if (buttonTitle === "btn-favorite") {
      setIsTyping(!isTyping);
    }
  };
  return (
    <Container>
      <div className="btn-favorite">
        <button onClick={handleButton} title="btn-favorite" className="btn">
          {!isTyping ? <IoMdHeartEmpty size={24} /> : <IoMdHeart size={24} />}
        </button>
      </div>
      <img src={img} alt={imgText} className="img" />
      <h1 className="title">
        {title}
        {" >"}
      </h1>
      <p className="description">{description}</p>
      <h2 className="value">R$ {value}</h2>
      <div className="btn-display">
        <button className="btn" onClick={handleButton} title="btn-remove">
          <IoMdRemove size={24} />
        </button>
        {quantidade > 9 ? <p>{quantidade}</p> : <p>0{quantidade}</p>}
        <button className="btn" onClick={handleButton} title="btn-add">
          <IoMdAdd size={24} />
        </button>
        <Button title={"incluir"} />
      </div>
    </Container>
  );
}
