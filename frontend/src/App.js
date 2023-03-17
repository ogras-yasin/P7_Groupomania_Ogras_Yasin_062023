// import "./style/app.css";

// import { useState, useEffect } from "react";

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
          {/* des qu'on se connecte il nous envoie a fiche user */}
          {/* <Route path="/ficheUser/" element={<FicheUser />}></Route> */}
          <Route path="/ficheUser/:id" element={<FicheUser />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
