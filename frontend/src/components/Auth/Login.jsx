import "../../style/login-signUp.css";
import { useState, useRef, useEffect } from "react";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const Login = (props) => {
  // j'utilise la ref et no le useState
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const url = "http://localhost:3000/api/auth/login";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    // controle validite email
    const regExEmail = (value) => {
      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    };

    /*     Les Erreurs Possibles de client et les logiques */
    if (!regExEmail(enteredEmail)) {
      setError({
        title: "Email invalide",
        message: "Entrer un format de mail valide",
      });
      return;
    }

    /* Champs vides */
    if (
      enteredEmail.trim().length === 0 ||
      enteredPassword.trim().length === 0
    ) {
      setError({
        title: "Un ou plusieurs Champs sont vides",
        message: "Entrer votre email et ou votre mot de passe",
      });
    }

    // pour vider les champs /lorsque on login on va changer de page pourquoi vider les champs ?
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  };
  const [error, setError] = useState();
  console.log(typeof error);
  if (error) {
    console.log("true");
  } else {
    console.log("false");
  }

  // controler si error true ou false
  // metre un state pour error modale true/false aficher /cacher
  return (
    <div className="App">
      {/* si erreur dans amil ou mdp alors affiche errormodal  */}
      {error && <ErrorModal title={error.title} message={error.message} />}
      <h1>Groupomania</h1>

      <h2>login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="email">Email</label>
        <input
          ref={emailInputRef}
          value={email}
          onChange={(e) => {
            // modification du hooks useState
            setEmail(e.target.value);
            // console.log(e);
          }}
          type="email"
          id="email"
          name="email"
          placeholder="email@email.com"
        />
        <label htmlFor="pass">Password</label>
        <input
          ref={passwordInputRef}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="pass"
          id="pass"
          name="pass"
          placeholder="****"
        />
        <button type="submit">Login</button>
        <button
          onClick={() => props.onFormSwitch("SignUp")}
          className="link-btn"
        >
          Don't have an account? Register here
        </button>

        <Button type={"submit"} onClick={() => {}}>
          Se connecter
        </Button>
      </form>
    </div>
  );
};

export default Login;
