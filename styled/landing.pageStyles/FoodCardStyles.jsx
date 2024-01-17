import { styled } from "styled-components";
export const FoodCardContainer = styled.div`
  box-shadow: 3px 3px 8px #808080ad;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-family: ${(props) => props.theme.fonts.$poppins};
  &:hover {
    transform: scale(1.03);
  }
`;

export const AddToCartBtn = styled.button`
  background: red;
  padding: 5px 10px;
  color: white;
`;
