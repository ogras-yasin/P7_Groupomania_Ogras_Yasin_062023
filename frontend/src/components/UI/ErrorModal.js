import "../../style/login-signUp.css";
import Button from "./Button";
import "../../style/errorModal.css";
import Card from "./Card";

const ErrorModal = (props) => {
  return (
    <div className="backdrop">
      <Card className="modal">
        <header>
          <h2>{props.title}</h2>
        </header>
        <div className="content">
          <p>{props.message}</p>
        </div>
        <footer className="actions">
          <Button>OK</Button>
        </footer>
      </Card>
    </div>
  );
};

export default ErrorModal;

// bu ise yaramaz import yap daha iyi email verification yapmak icin
