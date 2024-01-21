import styled from "styled-components";

export const ItemsInDetailsTable = styled.table`
  width: 100%;
  font-family: ${(props) => props.theme.fonts.$poppins};
  color: #6e6d6d;

  @media screen and (max-width: 768px) {
    display: block;
    overflow-x: scroll;
    white-space: nowrap;
  }

  & tr {
    border-bottom: 1px solid #e5e7eb;
  }
  & th {
    font-weight: 500;
    padding: 10px;
    text-align: start;
    font-size: 1rem;
  }
  & td {
    padding: 20px 10px;
    font-weight: 400;
    font-size: 1rem;
    align-items: center;
    & span {
      display: flex;
      margin: auto;
      padding: 6px 10px;
      border-radius: 20px;
      text-align: center;
      display: block;
      width: 113px;
      &.processing {
        background: #ff8c003d;
        color: #ff8c00e4;
        cursor: pointer;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        &:hover {
          transform: scale(1.1);
        }
      }
      &.view {
        background: #2b00ff3f;
        color: #2b00ff;
        cursor: pointer;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        &:hover {
          transform: scale(1.1);
        }
      }
      &.delivered {
        background: #068508b1;
        color: #ffffffc8;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        &:hover {
          transform: scale(1.1);
        }
      }
      &.cancelled {
        background: #ff000041;
        color: red;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
    &.pending-style {
      color: #da9708e0;
    }
    &.processing-style {
      color: #0436dbdf;
    }
    &.delivered-style {
      color: #187d06df;
    }
    &.cancelled-style {
      color: #bc0303df;
    }
  }
`;
