import "../../style/login-signUp.css";
import Button from "./Button";
import "../../style/errorModal.css";
import Card from "./Card";
import { createPortal } from "react-dom";
// Pour creer le Portal on importe de react-Dom(react-dom est importer automatiquement tout comme react)

// Backdrop = toile de fond
const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onConfirm} />;
};
// overlay =recouvrir
const ErrorModaleOverlay = (props) => {
  return (
    // <div className="backdrop" onClick={props.onConfirm}>
    <Card className="modal">
      <header>
        <h2>{props.title}</h2>
      </header>
      <div className="content">
        <p>{props.message}</p>
      </div>
      <footer className="actions">
        <Button onClickProps={props.onConfirm}>OK</Button>
      </footer>
    </Card>
    // {/* </div> */}
  );
};
// ErrorModal  ==> ErrorModaleOverlay
// parent ==> children
// comme d'hab on passe les informations par le biais des props
// comment le parent ErrorModal va passer la prop de onConfirm a son enfant  ErrorModaleOverlay ?
const ErrorModal = (props) => {
  return (
    <>
      {/* le backdrop */}
      {createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {/* la modale message d'erreur  */}
      {createPortal(
        <ErrorModaleOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("modal-root")
      )}
    </>
  );
};

export default ErrorModal;

// bu ise yaramaz import yap daha iyi email verification yapmak icin
