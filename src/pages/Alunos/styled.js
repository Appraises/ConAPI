import styled from "styled-components";

export const Title = styled.h1`color: ${(props) => (props.isRed ? "red" : "blue")}
`;

export const AlunoContainer = styled.div`
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0px;
  }

  div > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin: 0;
  }

  div + div{
    border-top: 1px solid #eee;
  }
`;

export const ProfilePicture = styled.div`

 img {
    height: 36px;
    width: 36px;
    border-radius: 50%;
    padding: 0 -10px;
  }
`;

export const DivFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
