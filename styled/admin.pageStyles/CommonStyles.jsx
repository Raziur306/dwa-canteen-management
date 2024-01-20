import styled from "styled-components";

export const PendingAndRequestPageContainer = styled.div`
  background: #fff;
  width: 100%;
  padding: 30px 20px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const PendingPageMenuWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 18px;
  font-family: ${(props) => props.theme.fonts.$poppins};
  color: #6e6d6d;
  font-weight: 500;
  & li {
    cursor: pointer;
    position: relative;
    &.active {
      color: #fa7c54;
      &:after {
        width: 100%;
      }
    }
    &:after {
      content: "";
      width: 0;
      height: 2px;
      background: #fa7c54;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 10px;
      transition: width 0.3s ease-in-out;
    }
    &:hover {
      &:after {
        width: 100%;
      }
    }
  }
`;