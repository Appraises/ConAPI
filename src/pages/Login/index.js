import React, { useState } from "react";
import { isEmail } from "validator";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";

import * as actions from "../../store/modules/auth/actions";

import { Container } from "../../styles/GlobalStyles";
import { Form, ConAPI } from "./styled";
import Loading from "../../components/Loading";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const prevPath = get(props, "location.state.prevPath", "/");
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error("Insira um e-mail válido.", {
        toastId: "errorEmail",
        theme: "dark",
      });
    }

    if (password.length < 5 || password.length > 50) {
      formErrors = true;
      toast.error("Insira uma senha.", {
        toastId: "errorPassword",
        theme: "dark",
      });
    }

    if (formErrors) return;

    dispatch(actions.loginRequest({ email, password, prevPath }));
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <ConAPI>Login</ConAPI>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu email"
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
          />
        </label>
        <button type="submit">Entrar</button>
      </Form>
    </Container>
  );
}
