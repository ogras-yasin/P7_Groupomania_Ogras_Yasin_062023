import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../store/authContext";
import MainHeader from "../Layout/MainHeader";

const FicheUser = () => {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);

  const isLoggedIn = authCtx.isLoggedIn;
  // console.log(isLoggedIn);

  if (isLoggedIn) {
    // fetchHandler()
  }
  return (
    <div>
      <MainHeader />
      <p>il a mis pas mal de chose de test.js</p>
      <p>mettre user id token c le profile</p>
      {!isLoggedIn && <Navigate to={"/"} />}
      {/* indirectement si je j'appuie sur disconnect ca me dirige vers la page accueil */}
    </div>
  );
};

export default FicheUser;
