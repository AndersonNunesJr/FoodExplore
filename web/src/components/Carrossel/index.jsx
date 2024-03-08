import { Container } from "./styles";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
export function Carrossel({ children, title }) {
  return (
    <Container>
      <h2>{title}</h2>
      <div className="carousel">
        <button className="btn">
          <PiCaretLeftBold size={24} />
        </button>
        {children}
        <button className="btn">
          <PiCaretRightBold size={24} />
        </button>
      </div>
    </Container>
  );
}
