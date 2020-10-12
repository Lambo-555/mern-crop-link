import React, {useContext} from 'react'
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const Navbar = props => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  };

  return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a href={"/"} className="navbar-brand">Link-Shorter</a>

        <div className="nav">
          <NavLink to="/create" className="nav-link">Создать</NavLink>
          <NavLink to="/links" className="nav-link">Ссылки</NavLink>
          <a
              href="/"
              onClick={logoutHandler}
              className="nav-link"
          >
            Выйти
          </a>
        </div>

      </nav>
  )
};