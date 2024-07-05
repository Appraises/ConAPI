import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Container } from "../../styles/GlobalStyles";
import { useParams } from "react-router-dom";
import { Form, ProfilePicture, Title } from "./styled";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

import { get } from "lodash";
import axios from "../../services/axios";
import history from "../../services/history";
import { isEmail, isInt, isFloat } from "validator";

import * as actions from "../../store/modules/auth/actions";

export default function Aluno() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [foto, setFoto] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function getData() {
      setIsLoading(true);

      try {
        const response = await axios.get(`/alunos/${id}`);
        const data = response.data;
        const Foto = get(data, "Fotos[0].url", "");
        setFoto(Foto);

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);
        setIsLoading(false);
      } catch (e) {
        const errors = get(e, "response.data.errors", "");
        const status = get(e, "response.status", 0);
        if (status === 400) errors.map((error) => toast.error(error));
        setIsLoading(false);
        history.push("/");
      }
    }
    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 5 || nome.length > 50) {
      formErrors = true;
      toast.error("O nome do aluno precisa ter entre 5 e 50 caracteres.", {
        toastId: "errorNome",
        theme: "dark",
      });
    }

    if (sobrenome.length < 3 || sobrenome.length > 25) {
      formErrors = true;
      toast.error("O sobrenome do aluno precisa ter entre 5 e 50 caracteres.", {
        toastId: "errorSobrenome",
        theme: "dark",
      });
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error("E-mail inválido.", {
        toastId: "errorEmail",
        theme: "dark",
      });
    }

    if (!isInt(String(idade))) {
      formErrors = true;
      toast.error("Idade inválida.", {
        toastId: "errorIdade",
        theme: "dark",
      });
    }

    if (!isFloat(String(peso))) {
      formErrors = true;
      toast.error("Peso inválido.", {
        toastId: "errorPeso",
        theme: "dark",
      });
    }

    if (!isFloat(String(altura))) {
      formErrors = true;
      toast.error("Altura inválida.", {
        toastId: "errorAltura",
        theme: "dark",
      });
    }

    if (formErrors) return;

    if (id) {
      try {
        setIsLoading(true);
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success("Aluno editado com sucesso.", {
          toastId: "successEdit",
          theme: "dark",
        });
        setIsLoading(false);
        history.push("/");
      } catch (e) {
        const errors = get(e, "response.data.errors", []);
        const status = get(e, "response.status", 0);
        if (status === 401) dispatch(actions.loginFailure());
        errors.map((error) => toast.error(error));
        setIsLoading(false);
        toast.error("Falha ao editar aluno.", {
          toastId: "errorEdit",
          theme: "dark",
        });
      }
    } else {
      try {
        setIsLoading(true);
        await axios.post("/alunos/", {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success("Aluno criado com sucesso.");
        setIsLoading(false);
        history.push("/");
      } catch (e) {
        const errors = get(e, "response.data.errors", []);
        const status = get(e, "response.status", 0);

        if (status === 401) dispatch(actions.loginFailure());
        errors.map((error) => toast.error(error));
        setIsLoading(false);
        toast.error("Falha ao criar aluno.");
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title> {id ? `Editar Aluno` : `Criar Aluno`} </Title>
      {id && (
        <ProfilePicture>
          {foto ? <img src={foto} alt={nome} /> : <FaUserCircle size={180} />}
          <Link to={`/fotos/${id}`}>
            <FaEdit />
          </Link>
        </ProfilePicture>
      )}
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Insira o nome do aluno."
          />
        </label>
        <label htmlFor="sobrenome">
          Sobrenome:
          <input
            type="text"
            id="sobrenome"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            placeholder="Insira o sobrenome do aluno."
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Insira o email do aluno."
          />
        </label>
        <label htmlFor="idade">
          Idade:
          <input
            type="number"
            id="idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            placeholder="Insira a idade do aluno."
          />
        </label>
        <label htmlFor="peso">
          Peso:
          <input
            type="number"
            id="peso"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            placeholder="Insira o peso do aluno."
          />
        </label>
        <label htmlFor="altura">
          Altura:
          <input
            type="number"
            id="altura"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            placeholder="Insira a altura do aluno."
          />
        </label>
        <button> Enviar </button>
      </Form>
    </Container>
  );
}
