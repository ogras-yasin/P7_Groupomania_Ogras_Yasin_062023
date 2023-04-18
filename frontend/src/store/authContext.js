import { createContext, useState } from "react";

// Le paramètre defaultValue définit une valeur initiale pour le contexte, qui peut être remplacée par n'importe quel composant enfant qui fournit sa propre valeur pour le contexte.
const defaultValue = {
  token: null,
  userId: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  isAdmin: false,
};

const AuthContext = createContext(defaultValue);

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

  // Je transforme IsLoggedIn en Boolean SI il trouve un token dans le state token alors true
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
