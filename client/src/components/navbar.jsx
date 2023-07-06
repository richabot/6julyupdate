import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css"
const NavBar = ({ user, logged, authenticated }) => {

  return (
    <div style={{ marginBottom: 15 }}>
      <nav className="nav nav-masthead justify-content-end">



        {!authenticated && (
          <React.Fragment>
            <li className="nav-item">
              <NavLink className="nav-link navlink" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-item nav-link navlink" to="/register">
                Register
              </NavLink>
            </li>
          </React.Fragment>
        )}

        {authenticated && (
          <React.Fragment>
            <li className="nav-item">
              <NavLink className="nav-link navlink" to="/logout">
                Logout
              </NavLink>
            </li>

          </React.Fragment>
        )}
        {authenticated && (
          <React.Fragment>
            <li className="nav-item">
              <NavLink className="nav-link navlink" to="/">
                {user.username}
              </NavLink>
            </li>

          </React.Fragment>
        )}

      </nav>
    </div>
  );
};

export default NavBar;
