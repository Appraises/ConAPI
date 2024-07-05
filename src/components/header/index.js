import React from "react";
import { Nav } from "./styled";
import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaPowerOff,
  FaCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import * as actions from "../../store/modules/auth/actions";
import { useSelector, useDispatch } from "react-redux";

export default function Header() {
  const dispatch = useDispatch();
  function handleClick(e) {
    e.preventDefault();
    dispatch(actions.loginFailure());
  }

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Nav>
      <div> ConAPI </div>
      <ul>
        <li>
          <Link to="/">
            <FaHome />
          </Link>
        </li>
        <li>
          <Link to="/login">
            {isLoggedIn ? <FaPowerOff onClick={handleClick} /> : <FaUserAlt />}
          </Link>
        </li>
        <li>
          <Link to="/register">
            <FaSignInAlt color="white" />
          </Link>
        </li>

        {isLoggedIn && <FaCircle color="lightgreen" />}
      </ul>
    </Nav>
  );
}
