import styled from "styled-components";

export const StyledLoginContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  font-family: ${(props) => props.theme.fonts.$poppins};
`;

export const StyledInputField = styled.input`
  width: 100%;
  display: flex;
  padding: 1rem;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  border-radius: 0.5rem;
  background: #fff;
  color: #4d4d4d;
  font-family: ${(props) => props.theme.fonts.$poppins};
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  border: 1px solid ${(props) => (props.$error ? "red" : "#dcd9d9")};
  &:focus {
    outline: none !important;
    border: 2px solid ${(props) => (props.$error ? "red" : "black")};
  }
`;

export const StyledLabel = styled.label`
  color: #4d4d4d;
  font-family: ${(props) => props.theme.fonts.$poppins};
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
`;

export const StyledLoginBtn = styled.button`
  margin-bottom: 1rem;
  cursor: pointer;
  display: flex;
  width: 26.375rem;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background: #0e1927;
  border: 1px solid #0e1927;
  color: #fff;
  margin-top: 1rem;
  text-align: center;
  font-family: ${(props) => props.theme.fonts.$poppins};
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
  &:hover {
    background: #0e1927bb;
  }
`;
