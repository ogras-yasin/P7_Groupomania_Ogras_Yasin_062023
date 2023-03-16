import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../store/authContext";
import "../../style/MainHeader.css";
const MainHeader = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  // console.log("authCtx:  ");
  // console.log(isLoggedIn);

  return (
    <div>
      <header className="header-nav">
        <nav>
          <ul className="header-ul">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <li>Accueil</li>
            </NavLink>
            {isLoggedIn && (
              <NavLink
                to="/FicheUser"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <li className="header-nav-li">Fiche User</li>
              </NavLink>
            )}
            {isLoggedIn && (
              <NavLink className={({ isActive }) => (isActive ? "" : "")}>
                <li
                  className={`${"header-nav-li"} ${"disconnect"}`}
                  onClick={() => {
                    console.log("deconection apuyer");
                    // useNavigate()

                    authCtx.logout();
                  }}
                >
                  Se déconnecter
                </li>
              </NavLink>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default MainHeader;
