import styled from "styled-components";
import { primaryColor } from "../../config/colors";

export const Nav = styled.nav`
  background: ${primaryColor};
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  div {
    color: white;
    font-weight: 800;
  }

  ul li {
    display: inline-block;
  }

  a {
    color: #fff;
    margin: 0 10px 0 0;
    font-weight: bold;
  }
`;
