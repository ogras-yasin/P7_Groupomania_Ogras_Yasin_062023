import "./style/app.css";
import { useState } from "react";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";

// connecter react au backend avec fetch ou axios
// fetch

function App() {
  const [currentForm, setCurrentForm] = useState("login");

  const toogleSwitch = (formName) => {
    setCurrentForm(formName);
    console.log(formName, "formname");
  };
  return (
    <div className="App">
      <h1>Groupomania</h1>
      {/* si le state = login la page de login s'affiche si le state change la page signup apparait tout ceci dans la meme route  */}
      {currentForm === "login" ? (
        <Login onFormSwitch={toogleSwitch} />
      ) : (
        <SignUp onFormSwitch={toogleSwitch} />
      )}
    </div>
  );
}

export default App;
