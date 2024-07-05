import React from "react";
import { Container } from "../../styles/GlobalStyles";
import { Title } from "./styled";

export default function Error404() {
  return (
    <Container>
      <Title>Error 404</Title>
      <p>
        A página que você buscou não existe se encontra indisponível no momento.
      </p>
    </Container>
  );
}
