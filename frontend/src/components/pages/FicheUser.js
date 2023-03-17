// window.location.search
import React, { useContext } from "react";
import { Navigate, useParams, useEffect } from "react-router-dom";
import AuthContext from "../../store/authContext";
import MainHeader from "../Layout/MainHeader";

const FicheUser = () => {
  const authCtx = useContext(AuthContext);

  // const { id } = useParams();
  // C'est quoi mon objectif: de passer les informations de ficheUser

  // recuperer tous les fichiers d'un userId
  // comment je fais pour acceder au ficheuser d'un userId
  const url = `http://localhost:3000/api/ficheUser/${authCtx.userId}`;
  // en faite ma route est tjs le meme ya pas le /:id

  const fetchHandler = async () => {
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
        console.log("dataResponse ==>", dataResponse);
      } else {
        throw new Error(
          `Failed to fetch data (${response.status}): ${dataResponse.message} `
        );
      }
    } catch (error) {
      console.log("Probleme serveur la req n'est pas parti");
      console.log(error);
    }
  };

  const isLoggedIn = authCtx.isLoggedIn;
  // console.log(isLoggedIn);

  if (isLoggedIn) {
    fetchHandler();
    // console.log()
  }
  return (
    <div>
      <MainHeader />
      <p>il a mis pas mal de chose de test.js</p>
      <p>mettre user id token c le profile</p>
      {!isLoggedIn && <Navigate to={"/"} />}
      {/* si j'appuie sur disconnect indirectement ca me dirige vers la page accueil */}
      {isLoggedIn && (
        <>
          <p>Bonjour xxxx: </p>
          <p>Votre photo: </p>
          <p>votre nom: recup le nom HOW </p>
          <p>userId: {authCtx.userId}</p>
          <p>token: {authCtx.token}</p>
        </>
      )}
    </div>
  );
};

export default FicheUser;

// import React, { useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";
// import AuthContext from "../../store/authContext";
// import MainHeader from "../Layout/MainHeader";

// const FicheUser = () => {
//   const authCtx = useContext(AuthContext);
//   const { id } = useParams();

//   const [ficheUser, setFicheUser] = useState(null);

//   const fetchHandler = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/ficheUser/${authCtx.userId}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authCtx.token}`,
//           },
//         }
//       );

//       const dataResponse = await response.json();

//       if (response.ok) {
//         setFicheUser(dataResponse.insidePromise);
//       } else {
//         throw new Error("error res.json() response.ok false");
//       }
//     } catch (error) {
//       console.log("Probleme serveur la req n'est pas parti");
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchHandler();
//   }, []);
//   // s
//   if (!ficheUser) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <MainHeader />
//       <h1>Fiche User</h1>
//       <p>{ficheUser.email}</p>
//     </div>
//   );
// };

// export default FicheUser;
