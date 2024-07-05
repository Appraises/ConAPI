import React, { useState } from "react";
import { toast } from "react-toastify";
import { isEmail } from "validator";
import { useSelector, useDispatch } from "react-redux";

import { Container } from "../../styles/GlobalStyles";
import { ConAPI, Form } from "./styled";
import Loading from "../../components/Loading";

import * as actions from "../../store/modules/auth/actions";

export default function Register() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.user.id);
  const nameStored = useSelector((state) => state.auth.user.nome) || "";
  const emailStored = useSelector((state) => state.auth.user.email) || "";
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [name, setName] = useState(nameStored);
  const [email, setEmail] = useState(emailStored);
  const [password, setPassword] = useState("");

  React.useEffect(() => {
    if (!id) return;

    setName(nameStored);
    setEmail(emailStored);
  }, [id, nameStored, emailStored]);

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (name.length < 6 || name.length > 255) {
      formErrors = true;
      toast.error("Insira um nome entre 6 e 255 caracteres.", {
        toastId: "errorName",
        theme: "dark",
      });
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error("Insira um e-mail válido.", {
        toastId: "errorEmail",
        theme: "dark",
      });
    }

    if (!id && (password.length < 3 || password.length > 50)) {
      formErrors = true;
      toast.error("Crie uma senha entre 3 e 50 caracteres.", {
        toastId: "errorPassword",
        theme: "dark",
      });
    }

    if (formErrors) return;

    dispatch(actions.registerRequest({ name, email, password, id }));
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <ConAPI> ConAPI </ConAPI>
      <h2> {id ? "Editar dados" : "Criar conta"} </h2>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            id="nome"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor="senha">
          Senha:
          <input
            type="password"
            id="senha"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button> {id ? "Salvar" : "Criar conta"} </button>
      </Form>
    </Container>
  );
}
