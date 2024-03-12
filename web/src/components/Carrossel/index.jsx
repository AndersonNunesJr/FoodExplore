import { useRef } from "react";
import { Container } from "./styles";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
export function Carrossel({ children, title }) {
  const carrossel = useRef(null);
  const handleButton = (e) => {
    e.preventDefault();
    const buttonTitle = e.currentTarget.title;
    if (buttonTitle === "left") {
      console.log(carrossel.current.offsetWidth);
      carrossel.current.scrollLeft -= carrossel.current.offsetWidth;
    }
    if (buttonTitle === "right") {
      carrossel.current.scrollLeft += carrossel.current.offsetWidth;
    }
  };
  return (
    <Container>
      <h2 className="title">{title}</h2>
      <div>
        <button className="btn" onClick={handleButton} title="left">
          <PiCaretLeftBold size={24} />
        </button>
        <div className="carrossel" ref={carrossel}>
          {children}
        </div>
        <button className="btn" onClick={handleButton} title="right">
          <PiCaretRightBold size={24} />
        </button>
      </div>
    </Container>
  );
}
