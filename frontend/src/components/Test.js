import { useContext } from "react";
import AuthContext from "../store/authContext";
import AuthForm from "./Auth/AuthForm";
import "./test.css";
import Button from "./UI/Button";
const Test = () => {
  const authCtx = useContext(AuthContext);
  // const isLoggedIn = authCtx.isLoggedIn;
  // nerden biliyon len connecter olmadigimi
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <div>
      {isLoggedIn && <p className="test-size"> userId: {authCtx.userId}</p>}
      {!isLoggedIn && <p>vous netes pas connecter</p>}
      {isLoggedIn && <p>token: {authCtx.token}</p>}
      {isLoggedIn && <Button>Se deconecter</Button>}
    </div>
  );
};

export default Test;
