import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// The defaultValue parameter sets an initial value for the context, which can be overridden by any child component that provides its own value for the context.
const defaultValue = {
  token: "vide",
  userId: "",
  userIsLoggedIn: false,
  login: () => {},
  logOutHandler: () => {},
};

// Creation du context pour l'autentification

const AuthContext = createContext(defaultValue);

// le context provider pour wrapper app.js
export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  // stockage du token d'authentification

  // une fonction pour mettre a jour le token dans le state
  const loginHandler = (token, userId) => {
    // alert("test");
    setToken(token);
    setUserId(userId);
    // mettre la donnee dans le localStorage
    // POURQUOI IL FONCTIONE PAS  pourtant toke et userId fonctionne
    localStorage.setItem("token", token);
  };

  // fonction pour se deconnecter
  const logoutHandler = () => {
    // suprimer le token de useState et LocalStorage
    setToken(null);
    localStorage.removeItem("token");
  };
  // s'il y a presence du token ca veut dire que je suis loggé
  // convertir le token en valeur booleene avec !=vrai et !!=false

  const userIsLoggedIn = !!token;
  // console.log("--> userIsLoggedIn");
  // console.log(userIsLoggedIn);

  // le context value //ceci peuvent etre recuperer par useContext
  const contextValue = {
    token: token,
    userId: userId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    //cette fonction loginHandler met a jour les 2 states en meme temps
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
