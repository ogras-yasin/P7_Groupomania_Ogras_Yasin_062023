import React from "react";

const ExerciceChildren = (props) => {
  return (
    <div>
      <h1>I am a child(je suis en rouge)</h1>
      <h5>{props.message}</h5>
      <h2>{props.name}</h2>
      <>{props.children}</>
    </div>
  );
};

export default ExerciceChildren;
