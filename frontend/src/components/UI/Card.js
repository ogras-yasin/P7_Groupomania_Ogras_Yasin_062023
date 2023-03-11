import "../../style/card.css";

// card de base
const Card = (props) => {
  // on prend l'enfant de card ma connaisance est assez fragile la notion props.cildren

  //   recevoir toutes les classnames du composant errormodals
  return <div className={`${props.className} ${"card"}`}>{props.children}</div>;
};

export default Card;
