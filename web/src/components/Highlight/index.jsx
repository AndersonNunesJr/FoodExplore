import { Container } from "./styles";

export function Highlight({ img, amount, value, title }) {
  return (
    <Container>
      <img src={img} alt="" />
      <div className="head">
        <div className="heading">
          {amount === undefined || amount === "" ? (
            <p>{title}</p>
          ) : (
            <>
              <p>
                {amount}X {title}
              </p>
              <span>R${value}</span>
            </>
          )}
        </div>
        <button type="button" className="excluir">
          Excluir iten
        </button>
      </div>
    </Container>
  );
}
