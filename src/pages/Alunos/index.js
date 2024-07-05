import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../services/axios";
import { get } from "lodash";

import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
  FaPlus,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { Container } from "../../styles/GlobalStyles";
import { AlunoContainer, ProfilePicture, DivFlex } from "./styled";
import Loading from "../../components/Loading";

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get("/alunos");
      setAlunos(response.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute("display", "block");
    e.currentTarget.remove();
  };

  async function handleDelete(e, id) {
    e.preventDefault();
    const elementDelete = e.currentTarget.parentElement;

    try {
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);
      toast.success("Usuário deletado com sucesso.", {
        toastId: "successDeleted",
        theme: "dark",
      });
      setIsLoading(false);
    } catch (e) {
      const status = get(e, "response.data.status", 0);
      if (status === 401) {
        toast.error("Você precisa fazer login.", {
          toastId: "erroPassword",
          theme: "dark",
        });
      } else {
        toast.error("Ocorreu um erro ao excluir aluno.", {
          toastId: "unknownError",
          theme: "dark",
        });
      }
      setIsLoading(false);
    }

    elementDelete.remove();
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <DivFlex>
        <h1> Alunos </h1>
        <Link to="/aluno/">{isLoggedIn ? <FaPlus /> : ""}</Link>
      </DivFlex>
      <AlunoContainer>
        {alunos.map((aluno) => (
          <div key={aluno.id ? String(aluno.id) : Math.random()}>
            {get(aluno, "Fotos[0].url") ? (
              <ProfilePicture>
                <img src={aluno.Fotos[0].url} alt="Foto do aluno" />
              </ProfilePicture>
            ) : (
              <FaUserCircle size={36} />
            )}
            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>
            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit />
            </Link>
            <Link onClick={handleDeleteAsk} to={`/aluno/${aluno.id}/delete`}>
              <FaWindowClose />
            </Link>

            <FaExclamation
              color="yellow"
              display="none"
              cursor="pointer"
              onClick={(e) => handleDelete(e, aluno.id)}
            />
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
