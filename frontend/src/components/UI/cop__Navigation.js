import React from "react";
import { NavLink, Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav style={{ textAlign: "center", marginTop: "20px" }}>
            
      <Link to="/" style={{ padding: "10px" }}>
                Auth Page       
      </Link>
            
      <Link to="/Test" style={{ padding: "10px" }}>
                Test       
      </Link>
      <Link to="/Profile" style={{ padding: "10px" }}>
                Profile       
      </Link>
          
    </nav>
    // <div>
    //   <ul>
    //     <NavLink to="/home">
    //       <li>Accueil</li>
    //     </NavLink>
    //     <NavLink to="/">
    //       <li>revenir a la page connexion </li>
    //     </NavLink>
    //   </ul>
    // </div>
  );
};

export default Navigation;
