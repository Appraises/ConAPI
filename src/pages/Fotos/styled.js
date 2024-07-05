import styled from "styled-components";
import * as colors from "../../config/colors";

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;


  input {
    display: none;
  }

  label {
    width: 180px;
    height: 180px;
    display: flex;
    color: black;
    justify-content: center;
    align-items: center;
    background: #eee;
    border: 5px dashed ${colors.primaryColor};
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;

    img {
      width: 180px;
      height: 180px;
    }
  }
`;
