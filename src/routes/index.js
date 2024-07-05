import React from "react";
import { Switch } from "react-router-dom";

import MyRoute from "./MyRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Alunos from "../pages/Alunos";
import Aluno from "../pages/Aluno";
import Fotos from "../pages/Fotos";
import Error404 from "../pages/Error404";

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Alunos} isClosed={false}></MyRoute>
      <MyRoute exact path="/login" component={Login} isClosed={false}></MyRoute>
      <MyRoute
        exact
        path="/register"
        component={Register}
        isClosed={false}
      ></MyRoute>
      <MyRoute
        exact
        path="/aluno/:id/edit"
        component={Aluno}
        isClosed
      ></MyRoute>
      <MyRoute exact path="/aluno/" component={Aluno} isClosed></MyRoute>
      <MyRoute exact path="/fotos/:id" component={Fotos} isClosed></MyRoute>
      <MyRoute path="*" component={Error404}></MyRoute>
    </Switch>
  );
}
