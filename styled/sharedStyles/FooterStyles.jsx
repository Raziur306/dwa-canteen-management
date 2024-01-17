import { styled } from "styled-components";

export const FooterContainer = styled.div`
  width: 100%;
  height: 10vh;
  background: #0e1927;
  padding: 5% 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
  & a {
    transition: all 0.3s ease-in-out;
    &:hover {
      color: gray;
    }
  }
`;
