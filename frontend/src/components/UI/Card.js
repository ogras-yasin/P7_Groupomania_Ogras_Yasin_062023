import "../../style/card.css";

// card de base
const Card = (props) => {
  // props.children on prend tous ce qui contient ds Card
  //   recevoir toutes les classnames du composant errormodals
  return <div className={`${props.className} ${"card"}`}>{props.children}</div>;
};

export default Card;

// Dans cet exemple, nous avons deux composants : ErrorModal et Card.

// Le composant Card est un composant de base qui définit la structure et le style de base pour une carte. Il prend un ensemble de propriétés (props) qui peut inclure des classes CSS et des enfants (props.children).

// Dans le composant ErrorModal, nous importons le composant Card et l'utilisons pour envelopper le contenu de notre modal. Nous transmettons également des propriétés (props) à Card, notamment une classe CSS spécifique (className) et des enfants (props.children) qui contiennent le contenu réel de notre modal.

// En utilisant les classes CSS transmises via les propriétés (props), nous pouvons combiner les styles de base de Card avec des styles spécifiques à ErrorModal pour créer une modal personnalisée. Cela permet une réutilisation facile de la structure et du style de Card pour d'autres composants qui nécessitent une structure similaire, tout en permettant une personnalisation facile du style et du contenu pour chaque composant spécifique.
