const Button = (props) => {
  return (
    <button
      className={props.type}
      //Ajouter l'attribut type pour limiter les styles au bouton lui-même
      onClick={props.onClickProps}
    >
      {props.children}
    </button>
  );
};

export default Button;
