import { styled } from "styled-components";
export const MyOrderTitleText = styled.h1`
  font-family: ${(props) => props.theme.fonts.$poppins};
  text-align: center;
  font-size: 1.5rem;
  margin: 40px;
  font-weight: bold;
`;

export const StyledTableContainer = styled.table`
  width: 100%;
  margin-bottom: 10px;
  font-family: ${(props) => props.theme.fonts.$poppins};

  & td,
  th {
    padding: 5px;
    border: 1px solid gray;
  }

  & .pending {
    color: #ffaa00;
  }
  & .cancelled {
    color: #ff0000;
  }
  & .processing {
    color: #300370;
  }
  & .delivered {
    color: #1a9305;
  }
`;
