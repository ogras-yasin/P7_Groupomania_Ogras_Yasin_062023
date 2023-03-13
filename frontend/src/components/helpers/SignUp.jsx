import { useState, useRef } from "react";
import Wrapper from "../helpers/Wrapper";
import ErrorModal from "../UI/ErrorModal";
import Button from "../UI/Button";
import Navigation from "../UI/Navigation";

const SignUp = (props) => {
  // jutilise useRef pour recup les donnees input
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // const [data, setData] = useState();
  const [isLogin, setIsLogin] = useState(true);

  // state pour gerer les erreurs
  const [error, setError] = useState();

  // Execution de la logique lorsque on submit(login /signup)
  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // se connecter et recuperer le userId et le token d'authentification
    const url = "http://localhost:3000/api/auth/signup";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
    })
      .then((response) => {
        console.log("response :   ", response);
        // recup du status de la res si ok(200-299)
        if (response.ok) {
          return response.json();
          //  ici cette ligne transforme le body de stringify a json
        } else {
          console.log(" res.ok a false");

          setError({
            title: "Authentification echec",
            message:
              "Mot de passe incorrect ou utilisateur non enregistrer dans la base de données",
            // maintenant que je pense j'aurais pu demander  a stackoverflow
          });

          return response.json();
        }
      })
      .then((data) => {
        console.log("data:   ", data);
      })
      .catch((err) => err);

    /*     Les Erreurs Possibles de client et les logiques */
    ///*  */ controle input pas vide/*  */

    if (
      enteredEmail.trim().length === 0 ||
      enteredPassword.trim().length === 0
    ) {
      // setError se met en true lorsque je lui passe un object(meme vide)
      setError({
        title: "Un ou plusieurs champs sont vides",
        message: "Entrer votre email et votre mot de passe",
      });
      return;
      //Le return vide est utilisé ici pour sortir de la fonction handleSubmit() immédiatement, sans exécuter le reste du code si les conditions dans le if sont remplies, c'est-à-dire si enteredEmail ou enteredPassword sont vides. Cela permet d'éviter l'execution d'un code inutile.(je fais ca pour economiser un else)
    }

    // controle validite email
    const regExEmail = (value) => {
      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    };

    if (!regExEmail(enteredEmail)) {
      setError({
        title: "Email invalide",
        message: "Entrer un format de mail valide",
      });
      return;
    }

    // pour vider les champs
    emailInputRef.current.value = "gs_yasin@hotmail.fr";
    passwordInputRef.current.value = "a";
  };
  // faire fonctionner la fonction errorhanfler lorsque on clique sur ok qui est un composant enfant

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
        {/* si erreur alors nous invoquons la module d'erreur */}
        {error && (
          <ErrorModal
            title={error.title}
            message={error.message}
            // onConfirm(est une props) on passe une fonction.Contrairement aux autres props celle ci faut Remonter l'enfant vers le parent
            onConfirm={errorHandler}
          />
        )}

        <form
          onChange={(e) => e.target.value}
          onSubmit={handleSubmit}
          className="register-form"
        >
          <h1>Groupomania</h1>
          {isLogin ? <h2>Créer un compte</h2> : <h2>Se connecter</h2>}
          {/* asagiga koyarim  */}
          <label htmlFor="email">Email</label>
          <input
            // value={}
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
            // value={}
            type="password"
            id="pass"
            name="pass"
            placeholder="****"
            ref={passwordInputRef}
          />
          <Button type={"submit"} onClick={() => {}}>
            {isLogin ? "S'inscrire" : "Se connecter"}
          </Button>
          <p onClick={toogleAuthModeHandler} className="toogleAuthMode">
            {isLogin ? "Se connecter" : "Créer un compte "}
          </p>
        </form>
      </div>
    </Wrapper>
  );
};

export default SignUp;
