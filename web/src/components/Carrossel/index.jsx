import { useEffect, useRef, useState } from "react";
import { Container } from "./styles";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
export function Carrossel({ children, title }) {
  const carrossel = useRef(null);
  const [isVoid, setIsVoid] = useState(false);

  const handleButton = (e) => {
    e.preventDefault();
    const buttonTitle = e.currentTarget.title;
    if (buttonTitle === "left") {
      carrossel.current.scrollLeft -= 650;
    }
    if (buttonTitle === "right") {
      carrossel.current.scrollLeft += 650;
    }
  };
  useEffect(() => {
    if (children == null) {
      setIsVoid(true);
    }
  }, []);
  return (
    <div>
      {!isVoid ? (
        <Container>
          <h2 className="title-container">{title}</h2>
          <div>
            <div className="btn-direction">
              <button className="btn" onClick={handleButton} title="left">
                <PiCaretLeftBold size={24} />
              </button>
            </div>
            <div className="carrossel" ref={carrossel}>
              {children}
            </div>
            <div className="btn-direction">
              <button className="btn" onClick={handleButton} title="right">
                <PiCaretRightBold size={24} />
              </button>
            </div>
          </div>
        </Container>
      ) : (
        <div></div>
      )}
    </div>
  );
}
