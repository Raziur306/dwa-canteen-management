import { styled } from "styled-components";
export const FoodItemsSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  & h1 {
    font-family: ${(props) => props.theme.fonts.$poppins};
    font-size: 1.25rem;
    font-weight: 600;
    position: relative;
    &:after {
      width: 100%;
      content: "";
      height: 2px;
      background: #b96d0f;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
`;
