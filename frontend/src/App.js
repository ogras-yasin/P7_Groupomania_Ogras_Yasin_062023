// import "./style/app.css";
import AuthForm from "./components/Auth/AuthForm";
import Test from "./components/Test";
// import { useState, useEffect } from "react";
// import SignUp from "./components/Auth/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Exercice from "./components/UI/Exercice";
import AuthContext, { AuthContextProvider } from "./store/authContext";
import { useContext } from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <AuthForm />
              <Test />
            </>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
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
