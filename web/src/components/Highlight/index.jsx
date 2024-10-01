import { Container } from "./styles";
import { useEffect, useRef } from "react";

export function Highlight({ buttonText, data, amount, onRemove }) {
  const titleTransition = useRef(null);
  const handleRemove = async () => {
    if (onRemove) {
      onRemove(data.id);
    }
  };

  useEffect(() => {
    if (titleTransition.current) {
      if (titleTransition.current.offsetWidth > 254) {
        titleTransition.current.setAttribute("class", "transition");
      }
    }
  }, [titleTransition.current]);

  return (
    <Container>
      <img src={data.productImg} alt="" />
      <div className="head">
        <div className="heading">
          {amount === undefined || amount === "" ? (
            <p ref={titleTransition}>{data.title}</p>
          ) : (
            <>
              <p ref={titleTransition}>
                {amount}X {data.title}
              </p>
              <span>R${data.price}</span>
            </>
          )}
        </div>
        <button type="button" className="excluir" onClick={handleRemove}>
          {buttonText || "Excluir"}
        </button>
      </div>
    </Container>
  );
}
