// window.location.search
import React, { useContext, useState, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../store/authContext";
import FicheUserDisplay from "../FicheUserDisplay/FicheUserDisplay";
import MainHeader from "../Layout/MainHeader";

const FicheUser = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const [data, setData] = useState({});
  const url = `http://localhost:3000/api/ficheUser/${authCtx.userId}`;

  // useCallback will return a memoized version of the callback that only changes if one of the inputs has changed.
  // Le useCallback regarde si rien n'a bouger il n'autorisera pas le rendu
  const fetchHandler = useCallback(async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
      });

      const dataResponse = await response.json();

      if (response.ok) {
        const reformatage = () => {
          return {
            age: dataResponse.ficheUser.age,
            prenom: dataResponse.ficheUser.prenom,
            nom: dataResponse.ficheUser.nom,
            photo: dataResponse.ficheUser.photoProfilUrl,
            idFiche: dataResponse.ficheUser._id,
            userId: dataResponse.ficheUser.userId,
            _id: dataResponse.ficheUser._id,
          };
        };
        setData(reformatage);
        // console.log("data==>", data.ficheUser.prenom);
      } else {
        throw new Error(
          `Failed to fetch data (${response.status}): ${dataResponse.msg} `
        );
      }
    } catch (error) {
      console.log("Probleme serveur la req n'est pas parti");
    }
  }, [authCtx.token, url]);
  // pour executer la fonction au montage
  useEffect(() => {
    if (isLoggedIn) {
      fetchHandler();
    }
  }, [fetchHandler, isLoggedIn]);
  // Je peux pas mettre fetchHandler(ds le useEffect) sinon il déclenche une nouvelle mise à jour du composant à chaque fois qu'il est exécuté. Dans ce cas, cela peut entraîner une boucle infinie de mises à jour du composant, ce qui explique pourquoi FicheUserDisplay est mis à jour plusieurs fois.

  return (
    <div>
      <MainHeader />
      {!isLoggedIn && <Navigate to={"/"} replace={true} />}
      {/* si j'appuie sur disconnect indirectement ca me dirige vers la page accueil */}
      {isLoggedIn && <FicheUserDisplay data={data} />}
    </div>
  );
};

export default FicheUser;
