import { styled } from "styled-components";

export const CartTitleTextStyle = styled.h1`
  font-family: ${(props) => props.theme.fonts.$poppins};
  text-align: center;
  font-size: 1.5rem;
  margin: 40px;
  font-weight: bold;
`;

export const CartTableStyles = styled.table`
  font-family: ${(props) => props.theme.fonts.$poppins};
  & h1 {
    font-size: 1.2rem;
    font-weight: 600;
  }
  & p {
    font-size: 0.8rem;
    color: gray;
  }
  & input {
    border: 1px solid gray;
    width: 50px;
    text-align: center;
    padding: 10px;
  }
`;

const CartInDeCrementBtnStyle = styled.button`
  width: 50px;
  font-size: 1.5rem;
  padding: 10px;
  color: white;
`;

export const CartIncreaseBtn = styled(CartInDeCrementBtnStyle)`
  background: black;
  &:hover {
    background: #000000db;
  }
`;
export const CartDecreaseBtn = styled(CartInDeCrementBtnStyle)`
  background: gray;
  &:hover {
    background: #808080db;
  }
`;

export const CartItemRemoveBtn = styled.button`
  width: 50px;
  font-size: 1.2rem;
  border: 1px solid gray;
  padding: 10px;
  &:hover {
    background: #8080808a;
  }
`;

export const CartCheckoutBtnStyle = styled.button`
  font-family: ${(props) => props.theme.fonts.$poppins};
  padding: 10px;
  width: 150px;
  border-radius: 5px;
  background: #0e1927;
  color: white;
  &:hover {
    background: #0e1927d1;
  }
`;
