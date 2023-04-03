import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Exercice from "./components/UI/Exercice";
import AuthContext, { AuthContextProvider } from "./store/authContext";
import { useContext, useState } from "react";
import Home from "./components/pages/Home";
import FicheUser from "./components/pages/FicheUser";
import NotFound from "./components/pages/NotFound";

function App() {
  return (
    // n'importe quel composant pourront acceder aux contexte d'authentification grace aux provider(AuthContextProvider)
    // OBURU BUNU INDEX.jse koydu .Js387
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/ficheUser/:id" element={<FicheUser />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;

// REGARDE CHAQUE PAGE  et comprendre le fonctionnement de mon site
