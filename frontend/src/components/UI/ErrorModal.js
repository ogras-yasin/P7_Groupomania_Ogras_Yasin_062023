// ErrorModal est en cours de pojet donc il n'est pas terminer

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
    <Card className="modal">
      <header className=".header-error_modal">
        <h2>{props.title}</h2>
      </header>
      <div className="content">
        <p>{props.message}</p>
      </div>
      <footer className="actions">
        <Button onClickProps={props.onConfirm}>OK</Button>
      </footer>
    </Card>
  );
};

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
