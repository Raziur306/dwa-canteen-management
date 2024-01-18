import { styled } from "styled-components";
export const NavBarContainer = styled.div`
  width: 100%;
  height: 60px;
  background: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 100px;
  box-shadow: 0px 3px 5px #80808091;
  position: sticky;
  top: 0;
  z-index: 200;
  & h1 {
    font-family: ${(props) => props.theme.fonts.$syncopate};
    font-weight: bold;
    font-size: 1.5rem;
  }
`;

export const NavBarMenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  font-family: ${(props) => props.theme.fonts.$poppins};
  font-weight: 500;
  & a,
  button {
    position: relative;
    text-transform: uppercase;
    &:after {
      position: absolute;
      display: block;
      bottom: 0;
      left: 0;
      height: 1px;
      background: red;
      content: "";
      width: 0%;
      transition: width 0.3s ease-in-out;
    }
    &:hover {
      &:after {
        width: 100%;
      }
    }
  }
`;
