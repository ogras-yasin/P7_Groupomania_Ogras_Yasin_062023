import "./style/app.css";
import { useState, useEffect } from "react";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [currentForm, setCurrentForm] = useState("login");

  const toogleSwitch = (formName) => {
    setCurrentForm(formName);
    console.log(formName, "formname");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="*" element={<Login />}></Route>

        {/* comment passer d'un bouton a l'autre */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

{
  /* <div className="App">

{currentForm === "login" ? (
  <Login onFormSwitch={toogleSwitch} />
) : (
  <SignUp onFormSwitch={toogleSwitch} />
)}
</div> */
}
{
  /* si le state = login la page de login s'affiche si le state change la page signup apparait tout ceci dans la meme route  */
}

// connecte toi au login et no post
// 3.la reele route a besoin d'une connexion  a mongoDB pour 1.auth et la 2.recup des donnees
// pour l'auth je pense que je dois me connecter aussi a mongo db aussi
// chat gpt

// const [backendData, setBackendData] = useState([{}]);

// je devraids implementer la route a services auth
// si je n'arrive pas a faire le auth ou plutot la connection fait la page accueil avec react
