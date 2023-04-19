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

  return (
    <div>
      <MainHeader />
      {!isLoggedIn && <Navigate to={"/"} replace={true} />}

      {isLoggedIn && <FicheUserDisplay data={data} />}
    </div>
  );
};

export default FicheUser;
