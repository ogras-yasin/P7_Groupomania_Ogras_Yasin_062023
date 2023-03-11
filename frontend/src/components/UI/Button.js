import classes from "../../style/Button.module.css";
// import "./Button.module.css"

const Button = (props) => {
  return (
    <button className={props.type || "gerek yok bence"} onClick={props.onClick}>
      {props.children}
    </button>
    // props.children est disponible dans chaque composant. Elle référence le contenu présent entre les balises ouvrante et fermante du composant. Par exemple :
  );
};

export default Button;
