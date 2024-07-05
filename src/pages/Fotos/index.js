import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { get } from "lodash";
import { useDispatch } from "react-redux";
import axios from "../../services/axios";

import { toast } from "react-toastify";

import { Container } from "../../styles/GlobalStyles";
import { Title, Form } from "./styled";

import Loading from "../../components/Loading";

import * as actions from "../../store/modules/auth/actions";

export default function Fotos() {
  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(get(data, "Fotos[0].url", ""));
        setIsLoading(false);
      } catch {
        toast.error("Erro ao obter imagem.");
        setIsLoading(false);
        history.push("");
      }
    };
    getData();
    setIsLoading(false);
  }, [id]);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const fotoURL = URL.createObjectURL(file);

    setFoto(fotoURL);

    const formData = new FormData();

    formData.append("aluno_id", id);
    formData.append("foto", file);

    try {
      setIsLoading(true);
      await axios.post("/fotos/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Foto enviada com sucesso.", {
        toastId: "successFoto",
        theme: "dark",
      });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);

      const status = get(err, "response.status", "");
      toast.error("Erro ao enviar foto.", {
        toastId: "errorFoto",
        theme: "dark",
      });

      if (status === 401) {
        dispatch(actions.loginFailure());
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading}></Loading>
      <Title> Fotos </Title>
      <Form>
        <label htmlFor="img">
          {foto ? <img src={foto} alt="foto" /> : "Selecionar"}
          <input type="file" id="img" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}
