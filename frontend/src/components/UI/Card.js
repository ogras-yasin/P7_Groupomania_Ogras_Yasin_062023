import "../../style/card.css";

// card de base
const Card = (props) => {
  // props.children on prend tous ce qui contient ds Card
  //   recevoir toutes les classnames du composant errormodals
  return <div className={`${props.className} ${"card"}`}>{props.children}</div>;
};

export default Card;
