import { call, put, all, takeLatest } from "redux-saga/effects";
import * as types from "../types";
import * as actions from "./actions";
import { toast } from "react-toastify";
import { get } from "lodash";

import axios from "../../../services/axios";
import history from "../../../services/history";

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, "/tokens", payload);
    yield put(actions.loginSuccess({ ...response.data }));
    toast.success("Login realizado com sucesso.", {
      toastId: "loginSucess",
      theme: "dark",
    });

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    history.push(payload.prevPath);
  } catch (e) {
    toast.error("Usuário ou senha inválidos.", {
      toastId: "loginFailed",
      theme: "dark",
    });

    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, "auth.token", "");
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function* registerRequest({ payload }) {
  const { id, name, email, password } = payload;

  try {
    if (id) {
      yield call(axios.put, "/users", {
        email,
        nome: name,
        password: password || undefined,
      });
      toast.success("Conta alterada com sucesso.");
      yield put(
        actions.registerUpdatedSuccess({ nome: name, email, password }),
      );
    } else {
      yield call(axios.post, "/users", {
        email,
        nome: name,
        password,
      });
      toast.success("Conta criada com sucesso.", {
        toastId: "erroPassword",
        theme: "dark",
      });
      yield put(
        actions.registerCreatedSuccess({ nome: name, email, password }),
      );
      history.push("/login");
    }
  } catch (e) {
    const errors = get(e, "response.data.errors", "");
    const status = get(e, "response.status", "");

    if (status === 401) {
      toast.error("Você precisa fazer login novamente.", {
        toastId: "erroPassword",
        theme: "dark",
      });
      yield put(actions.loginFailure());
    }

    if (errors.length > 0) {
      errors.map((error) =>
        toast.error(error, {
          toastId: "erroPassword",
          theme: "dark",
        }),
      );
    } else {
      toast.error("Erro desconhecido.", {
        toastId: "erroPassword",
        theme: "dark",
      });
    }

    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
