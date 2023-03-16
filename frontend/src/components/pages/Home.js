import React, { useContext } from "react";
import AuthContext from "../../store/authContext";
import AuthForm from "../Auth/AuthForm";
import Feed from "../Feed/Feed";
import MainHeader from "../Layout/MainHeader";
import Navigation from "../UI/Navigation";

const Home = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <section>
      <MainHeader />
      {!isLoggedIn && <AuthForm />}
      {/* je ne me dirige pas vers l'accueil mais plutot vers la page fiche user */}
      {/* lorsque je fais se deconnecter il me dirige pas vers login  */}
      <p>cest le lien "/" lorsque tu est connecte</p>
      <Feed />
    </section>
  );
};

export default Home;
