import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;

  .back {
    width: fit-content;
    margin: 0 0 15px 50px;
    display: flex;
    background: transparent;
    color: ${theme.getColorStyle("LIGHT_100")};
    align-items: center;
  }
`;

export const Form = styled.form`
  color: ${theme.getColorStyle("LIGHT_300")};
  margin: 0 50px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  > div p {
    color: ${theme.getColorStyle("LIGHT_400")};
  }

  .details {
    width: 100%;
    display: grid;

    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 15px;

    > div {
      display: flex;
      flex-direction: column;
      gap: 10px;
      justify-content: space-between;
      > :nth-child(2) {
        height: 40px;
      }

      > button {
        background: ${theme.getColorStyle("DARK_800")};
      }
    }
    .description {
      grid-column: 1 / span 5;
      > textarea {
        height: 150px;
      }
    }
    .name {
      grid-column: 2 / span 2;
    }
    .category {
      grid-column: 4 / span 2;
    }
  }

  .black {
    background: ${theme.getColorStyle("DARK_800")};
    width: fit-content;
  }

  .tags {
    grid-column: 1 / span 4;

    .section_tag {
      display: flex;
      flex-wrap: wrap;
      background: ${theme.getColorStyle("DARK_800")};
      gap: 5px;
      padding: 8px;
      border-radius: 5px;

      > div {
        /* width: fit-content; */
      }
    }
  }
  > Button {
    width: fit-content;
  }
`;
