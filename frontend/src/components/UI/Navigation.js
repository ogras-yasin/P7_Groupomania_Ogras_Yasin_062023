import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <ul>
        <NavLink to="/">
          <li>Login</li>
        </NavLink>
        <NavLink to="/signup">
          <li>Signup</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;
