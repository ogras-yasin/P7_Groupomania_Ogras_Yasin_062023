import { useState, useRef, useContext } from "react";
import Wrapper from "../helpers/Wrapper";
import ErrorModal from "../UI/ErrorModal";
import Button from "../UI/Button";
import AuthContext from "../../store/authContext";

const AuthForm = () => {
  // jutilise useRef pour recup les donnees input
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // utilisation du context
  const authCtx = useContext(AuthContext);

  // toogle entre login/signup
  const [isLogin, setIsLogin] = useState(true);

  // state pour gerer les erreurs
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const url = isLogin
      ? "http://localhost:3000/api/auth/login"
      : "http://localhost:3000/api/auth/signup";

    const fetchHandler = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
          }),
        });
        const dataResponse = await response.json();
        if (response.ok) {
          // mettre a jour le token dans le context
          authCtx.login(
            dataResponse.token,
            dataResponse.userId,
            dataResponse.isAdmin
          );
        } else {
          setError({
            title: "Authentification echec",
            message: "Veuillez respecter les conditions",
          });
        }
      } catch (error) {
        console.log(" erreur lier au serveur: ", error);
      }
    };

    fetchHandler();

    // vider les champs
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    // ------------------------------------------------
  };

  const toogleAuthModeHandler = () => {
    console.log("toogleAuthModeHandler");
    // toogle ==> si true alors false si false alors true
    setIsLogin((prevState) => !prevState);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      <div className="App">
        {error && (
          <ErrorModal
            title={error.title}
            message={error.message}
            onConfirm={errorHandler}
          />
        )}

        <form
          onChange={(e) => e.target.value}
          onSubmit={handleSubmit}
          className="register-form"
        >
          {isLogin ? <h2>Se connecter</h2> : <h2>Créer un compte</h2>}
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => {}}
            type="email"
            id="email"
            name="email"
            placeholder="email@email.com"
            ref={emailInputRef}
          />
          <label htmlFor="pass">Password</label>{" "}
          <input
            onChange={(e) => {}}
            type="password"
            id="pass"
            name="pass"
            placeholder="password"
            ref={passwordInputRef}
          />
          <Button type={"submit"}>
            {isLogin ? "Se connecter" : "S'inscrire"}
          </Button>
          <p onClick={toogleAuthModeHandler} className="toogleAuthMode">
            {isLogin ? "Créer un compte " : "Se connecter"}
          </p>
        </form>
      </div>
    </Wrapper>
  );
};

export default AuthForm;
