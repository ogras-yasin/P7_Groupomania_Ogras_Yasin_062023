import { useState, useRef, useContext } from "react";
import Wrapper from "../helpers/Wrapper";
import ErrorModal from "../UI/ErrorModal";
import Button from "../UI/Button";
import Navigation from "../UI/Navigation";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import MainHeader from "../Layout/MainHeader";
import AuthContext from "../../store/authContext";
// import Test from "../Test";

const AuthForm = () => {
  // jutilise useRef pour recup les donnees input
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [data, Setdata] = useState("");
  const navigate = useNavigate();

  // utilisation du context
  // verification qu'on a acces au contexts
  const authCtx = useContext(AuthContext);

  const example = () => {
    // alert("test");
    // localStorage.clear();
  };

  // toogle entre login/signup
  const [isLogin, setIsLogin] = useState(true);

  // state pour gerer les erreurs
  const [error, setError] = useState();

  // Execution de la logique lorsqu'on submit(login /signup)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // se connecter/s'insrire et recuperer le userId et le token d'authentification
    const url = isLogin
      ? "http://localhost:3000/api/auth/login"
      : "http://localhost:3000/api/auth/signup";

    // async func fetchHandler
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
        // console.log(response);
        console.log(dataResponse);
        if (response.ok) {
          Setdata(dataResponse);
          console.log("dataResponse: ==>");
          console.log(data);

          // mettre a jour le token dans le context
          authCtx.login(dataResponse.token, dataResponse.userId);
          // dirige vers la page accueil /fiche utilisateur
          navigate("/FicheUser");
        } else {
          setError({
            title: "Authentification echec",
            message: "Veuillez respecter les conditions",
          });
        }
      } catch (error) {
        console.log(error); /* erreur lier au serveur */
      }
    };

    fetchHandler();

    // fetch(url, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     email: enteredEmail,
    //     password: enteredPassword,
    //   }),
    // })
    //   .then((response) => {
    //     // Logique pour avertir l'utilisateur en cas d'erreur avec setError
    //     console.log("response :   ", response);
    //     // recup du status de la res si ok(200-299)
    //     if (response.ok) {
    //       console.log(response);
    //       navigate("/FicheUser");

    //       return response.json();
    //       //  ici cette ligne transforme le body de stringify a json
    //     } else {
    //       console.log(" res.ok a false");

    //       setError({
    //         title: "Authentification echec",
    //         message: "Erreur veuillez respecter les conditions",
    //       });

    //       return response.json();
    //     }
    //   })
    //   .then((data) => {
    //     console.log("data:   ", data);
    //     // Enregistrer token ok  //se deconnecter ne fonctionne pas
    //     localStorage.setItem("token", `${data.token}`);
    //   })
    //   .catch((err) => err);

    // controle validite her sey bittikten sonra buraya koyarson regex filan

    // pour vider les champs
    emailInputRef.current.value = "gs_yasin@hotmail.fr";
    passwordInputRef.current.value = "a";
    // ------------------------------------------------
  };

  const toogleAuthModeHandler = () => {
    console.log("toogleAuthModeHandler");
    // toogle ==> si true alors false si false alors true
    setIsLogin((prevState) => !prevState);
  };

  // faire fonctionner la fonction errorhandler lorsque on clique sur ok qui est un composant enfant
  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {/* <Navigation /> */}
      {/* <MainHeader /> */}
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
          {/* <h1>Groupomania</h1> */}
          {isLogin ? <h2>Se connecter</h2> : <h2>Créer un compte</h2>}
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
            placeholder="password"
            ref={passwordInputRef}
          />
          <Button
            type={"submit"}
            onClickProps={() => {
              localStorage.setItem("monChat", "TomJerry");
            }}
          >
            {isLogin ? "Se connecter" : "S'inscrire"}
            {/* se connceter ou s'inscrire si token generer dirige moi vers accueil */}
          </Button>
          <p onClick={toogleAuthModeHandler} className="toogleAuthMode">
            {isLogin ? "Créer un compte " : "Se connecter"}
          </p>
          {/* <Button onClickProps={() => {}}>Se deconnecter</Button> */}
        </form>
      </div>
    </Wrapper>
  );
};

export default AuthForm;

// -----coller cette partie dans la fonction  AuthConnection apres que le projet est terminer, car la ca pollue mon code

//  /*     Les Erreurs Possibles de client et les logiques */
//     ///*  */ controle input pas vide/*  */

//     if (
//       enteredEmail.trim().length === 0 ||
//       enteredPassword.trim().length === 0
//     ) {
//       // setError se met en true lorsque je lui passe un object(meme vide)
//       setError({
//         title: "Un ou plusieurs champs sont vides",
//         message: "Entrer votre email et votre mot de passe",
//       });
//       return;
//       //Le return vide est utilisé ici pour sortir de la fonction handleSubmit() immédiatement, sans exécuter le reste du code si les conditions dans le if sont remplies, c'est-à-dire si enteredEmail ou enteredPassword sont vides. Cela permet d'éviter l'execution d'un code inutile.(je fais ca pour economiser un else)
//     }

// // controle validite email
// const regExEmail = (value) => {
//   return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
// };

// if (!regExEmail(enteredEmail)) {
//   setError({
//     title: "Email invalide",
//     message: "Entrer un format de mail valide",
//   });
//   return;
// }
