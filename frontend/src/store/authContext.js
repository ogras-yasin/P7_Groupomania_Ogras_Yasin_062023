import { createContext, useState } from "react";

// The defaultValue parameter sets an initial value for the context, which can be overridden by any child component that provides its own value for the context.
const defaultValue = {
  token: "vide",
  userId: "",
  userIsLoggedIn: false,
  login: () => {},
  logOutHandler: () => {},
  isAdmin: false,
};

// Creation du context pour l'autentification
const AuthContext = createContext(defaultValue);

// le context provider pour wrapper app.js
export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  // console.log("token =>>", token);

  // une fonction pour mettre a jour le token dans le state
  const loginHandler = (token, userId, isAdmin) => {
    // alert("test");
    setToken(token);
    setUserId(userId);
    setIsAdmin(isAdmin);
    localStorage.setItem("token", token);
  };

  // fonction pour se deconnecter
  const logoutHandler = () => {
    // suprimer le token de useState et LocalStorage
    setToken(null);
    localStorage.removeItem("token");
  };

  // convertir le token en valeur booleene avec !=vrai et !!=false
  const userIsLoggedIn = !!token; /*  || !!initialToken; */
  // Si "token" est une valeur truthy (c'est-à-dire une valeur qui est considérée comme vraie en JavaScript alors elle renverra true

  // le context value //ceci peuvent etre recuperer par useContext

  const contextValue = {
    token: token,
    userId: userId,
    isAdmin: isAdmin,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    //cette fonction loginHandler met a jour les 3 states en meme temps
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

// const initialToken = localStorage.getItem("token");
// const [token, setToken] = useState(initialToken);

// De cette façon, si un token est enregistré dans le localStorage lors du chargement initial de la page, userIsLoggedIn sera défini sur true et l'utilisateur restera connecté après le rechargement de la page
