import styled from "styled-components";
import * as colors from "../../config/colors";

export const ConAPI = styled.h1`
  font-weight: bolder;
  letter-spacing: 0.1px;
  color: ${colors.primaryColor};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  input {
    color: white;
    padding: 0 10px;
    height: 30px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    margin-top: 5px;
    background-color: #1F1F23;
  }

  input:focus {
    border: 1px solid ${colors.primaryColor}
  }

  button:hover {
    filter: brightness(75%)
  }
`;
