import React from "react";
import "../../style/exercice.css";
import ExerciceChildren from "./ExerciceChildren";

const herName = "Ariana M";

const Exercice = () => {
  return (
    <div>
      <h1>Objectif comprendre les props puis les props.children</h1>
      <p>pour cela je devrais avoir un composant</p>
      <ExerciceChildren
        message="le props a bien ete recu, le props a etait passe du parent a l'enfant"
        name={herName}
      >
        <p>maintenant passe un props a ExerciceChildren</p>
        <p>maintenant passe une props children</p>
        <p>
          Le prop est transmis du parent à l'enfant via la déclaration de '
          {/* < */}ExerciceChildren message="..."{/* > */}' dans le composant
          parent. Le composant enfant reçoit ce prop dans ses props et l'utilise
          dans sa logique de rendu.
        </p>
        <h4>
          le props a etait passe du parent a l'enfant vrai;; tous ce qu'il y a
          entre ExerciceChildren passe comme enfant a ExerciceChildren avec la
          props props.children
        </h4>
      </ExerciceChildren>
      <p>make composant to a better organisation</p>
    </div>
  );
};

export default Exercice;
