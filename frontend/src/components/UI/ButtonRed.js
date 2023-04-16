const ButtonRed = (props) => {
  return (
    <button
      className={props.type}
      //Ajouter l'attribut type pour limiter les styles au bouton lui-même
      onClick={props.onClickProps}
    >
      {props.children}
    </button>
    // props.children est disponible dans chaque composant. Elle référence le contenu présent entre les balises ouvrante et fermante du composant. Par exemple :
  );
};

export default ButtonRed;
