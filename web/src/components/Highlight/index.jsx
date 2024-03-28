import { Container } from "./styles";

export function Highlight({ img, amount, value, title }) {
  return (
    <Container>
      <img src={img} alt="" />
      <div className="head">
        <div className="heading">
          <p>
            {amount}X {title}
          </p>
          <span>R${value}</span>
        </div>
        <button type="button" className="excluir">
          Excluir
        </button>
      </div>
    </Container>
  );
}
