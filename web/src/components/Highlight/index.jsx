// import { Container } from "./styles";

// export function Highlight({ img, amount, value, title, buttonText, data }) {
//   return (
//     <Container>
//       <img src={img} alt="" />
//       <div className="head">
//         <div className="heading">
//           {amount === undefined || amount === "" ? (
//             <p>{title}</p>
//           ) : (
//             <>
//               <p>
//                 {amount}X {title}
//               </p>
//               <span>R${value}</span>
//             </>
//           )}
//         </div>
//         <button type="button" className="excluir">
//           {!buttonText ? "Excluir" : buttonText}
//         </button>
//       </div>
//     </Container>
//   );
// }

// CODIGO E ESSE DE BAIXO

import { Container } from "./styles";

export function Highlight({ buttonText, data, amount }) {
  return (
    <Container>
      <img src={data.productImg} alt="" />
      <div className="head">
        <div className="heading">
          {amount === undefined || amount === "" ? (
            <p>{data.title}</p>
          ) : (
            <>
              <p>
                {amount}X {data.title}
              </p>
              <span>R${data.price}</span>
            </>
          )}
        </div>
        <button type="button" className="excluir">
          {!buttonText ? "Excluir" : buttonText}
        </button>
      </div>
    </Container>
  );
}
