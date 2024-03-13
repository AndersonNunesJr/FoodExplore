import { Button } from "../Button";
import { Container } from "./styles";
import { IoMdRemove, IoMdAdd, IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { useEffect, useRef, useState } from "react";

export function Card({ title, description, value, img, imgText }) {
  const [quantidade, setQuantidade] = useState("1");
  const [isTyping, setIsTyping] = useState(false);
  const titleTransition = useRef(null);

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

  useEffect(() => {
    if (titleTransition.current) {
      if (titleTransition.current.offsetWidth > 254) {
        titleTransition.current.setAttribute("class", "transition");
      }
    }
  }, []);

  return (
    <Container>
      <div className="btn-favorite">
        <button onClick={handleButton} title="btn-favorite" className="btn">
          {!isTyping ? <IoMdHeartEmpty size={24} /> : <IoMdHeart size={24} />}
        </button>
      </div>
      <img src={img} alt={imgText} className="img" />
      <div className="title">
        <h1 ref={titleTransition}>
          {title}
          {" >"}
        </h1>
      </div>
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
