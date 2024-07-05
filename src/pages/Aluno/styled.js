import styled from "styled-components";
import * as colors from "../../config/colors";

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

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 15px 0;
  position: relative;
  margin-top: 30px;

  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    position: absolute;
    bottom: 0;
    background-color: #fff;
    padding: 5px;
    border-radius: 50%;
  }
`;

export const Title = styled.h1`
  text-align: center;
`;
