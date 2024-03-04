import styled from "styled-components";

// export const Container = styled.div`
//   display: flex;
//   align-items: center;
//   color: aliceblue;
//   background: linear-gradient(to bottom, #091e26, #00131c);
//   margin: 0 124px;

//   > img {
//     width: 500px;
//     height: 500px;
//     background: transparent;
//   }
//   > div {
//     padding: 80px 100px 90px 0;
//     background: transparent;
//     > h2 {
//       background: transparent;
//     }
//     > p {
//       background: transparent;
//     }
//   }
// `;

export const Container = styled.div`
  display: flex;
  align-items: center;
  color: aliceblue;
  background: linear-gradient(to bottom, #091e26, #00131c);
  margin: 124px 124px 0;
  position: relative;

  > img {
    width: 400px;
    height: 300px;
    background: transparent;
    position: absolute;
    top: -85px;
  }

  > div {
    padding: 80px 100px 90px 0;
    background: transparent;

    > h2 {
      background: transparent;
    }

    > p {
      background: transparent;
    }
  }
`;
