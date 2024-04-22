import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  color: aliceblue;

  > h1 {
    margin-top: 32px;
    margin-bottom: 32px;
    padding-left: 75px;
  }
`;

export const Board = styled.div`
  height: 100%;

  margin: 0 75px 75px;

  display: grid;
  grid-area: "name" "status" "code" "details" "data";
  grid-template-columns: 1fr 1fr 5fr 1fr;
  grid-template-rows: 50px auto;

  p {
    border-bottom: solid 1px red;
    padding: 5px 10px;
  }

  .name {
    display: flex;
    align-items: center;
    border: solid 1px red;

    padding: 5px 10px;
  }
  .left {
    border-radius: 8px 0 0 0;
  }
  .right {
    border-radius: 0 8px 0 0;
  }
  .status {
    border-right: solid 1px red;
    border-left: solid 1px red;
    border-bottom: solid 1px red;
    padding: 5px 0 10px 0;
  }
  .code {
    border-bottom: solid 1px red;
    padding: 5px 0 10px 0;
  }
  .details {
    border-bottom: solid 1px red;
    border-right: solid 1px red;
    border-left: solid 1px red;
    padding: 5px 0 10px 0;
  }
  .data {
    border-right: solid 1px red;
    border-bottom: solid 1px red;
    padding: 5px 0 10px 0;
  }
`;
