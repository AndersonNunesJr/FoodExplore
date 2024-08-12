import styled from "styled-components";
import theme from "../../styles/theme";
import { PiCaretDownBold } from "react-icons/pi";

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
    }

    .add_img {
      .custom-file-label {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;

        border-radius: 8px;
        cursor: pointer;
        gap: 15px;

        background-color: ${theme.getColorStyle("DARK_800")};

        color: ${theme.getColorStyle("LIGHT_400")};

        > svg {
          background: transparent;
        }
      }
      .custom-file-input {
        display: none;
      }
    }

    .name {
      grid-column: 2 / span 2;

      div {
        background-color: ${theme.getColorStyle("DARK_800")};
      }
    }

    .category {
      grid-column: 4 / span 2;

      div {
        position: relative;
        display: flex;
        align-items: center;

        > select {
          width: 100%;
          height: 100%;
          padding: 0 0 0 15px;
          border-radius: 8px;

          background-color: ${theme.getColorStyle("DARK_800")};

          color: ${theme.getColorStyle("LIGHT_500")};
          outline: none;
          border: none;
        }
      }
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
      }
    }

    .price {
      div {
        background-color: ${theme.getColorStyle("DARK_800")};
      }
    }

    .description {
      grid-column: 1 / span 5;
      > textarea {
        height: 150px;
      }
    }
  }

  .btn-group {
    display: flex;
    justify-content: flex-end;
  }
`;
