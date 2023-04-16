import { createContext, useState } from "react";
// import jwt from "jsonwebtoken";
// TOKEN I YENIDEN INDERMEM LAZIM
// supprime le node module et reinstale l'app
// ((((((((((((((((--- ))))))))))))))))

// The defaultValue parameter sets an initial value for the context, which can be overridden by any child component that provides its own value for the context.
const defaultValue = {
  token: null,
  userId: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  isAdmin: false,
};

// const AuthContext = createContext(defaultValue);
const AuthContext = createContext(defaultValue);

// le context provider pour wrapper app.js
console.log(localStorage.getItem("token"));

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") || false
  );

  // une fonction pour mettre a jour le token dans le state
  const login = (token, userId, isAdmin) => {
    setToken(token);
    setUserId(userId);
    setIsAdmin(isAdmin);
    // enregistrer token, userId et isAdmin ds le localstorage afin de recuperer ces donnees lors du f5
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("isAdmin", isAdmin);
  };

  // fonction pour se deconnecter
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
  };

  const isLoggedIn = !!token;

  const contextValue = {
    token,
    userId,
    isAdmin,
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
// !! veut dire truthy
// Je transforme userIsLoggedIn en Boolean SI il trouve un token dans le state token
// const userIsLoggedIn = !!token;
// Il ne peut pas trouver token car il doit passer pas authform directement avant
