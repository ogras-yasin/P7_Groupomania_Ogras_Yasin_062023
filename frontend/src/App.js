// import "./style/app.css";
import AuthForm from "./components/Auth/AuthForm";
import Test from "./components/Test";
// import { useState, useEffect } from "react";
// import SignUp from "./components/Auth/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Exercice from "./components/UI/Exercice";
import AuthContext, { AuthContextProvider } from "./store/authContext";
import { useContext, useState } from "react";
import Home from "./components/pages/Home";
import Profile from "./components/Profile";
import FicheUser from "./components/pages/FicheUser";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(null);
  const logIn = () => {
    setisLoggedIn(true);
  };
  const logOut = () => {
    setisLoggedIn(false);
  };
  return (
    // n'importe quel composant pourront acceder aux contexte d'authentification grace aux provider(AuthContextProvider)
    // OBURU BUNU INDEX.jse koydu .Js387
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          {/* {isLoggedIn ? (
          <button onClick={logOut}>Logout</button>
        ) : (
          <button onClick={logIn}>Login</button>
        )} */}
          {/* <Route path="/" element={<AuthForm />}></Route> */}
          <Route path="/" element={<Home />}></Route>
          <Route path="/FicheUser" element={<FicheUser />}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
          <Route path="*" element={<AuthForm />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;

{
  /* <>
      {!isLoggedIn && <AuthForm />}
      <Test />

      {console.log("auth =====>2", authCtx)}
    </> */
}

// je devraids implementer la route a services auth
// si je n'arrive pas a faire le auth ou plutot la connection fait la page accueil avec react
