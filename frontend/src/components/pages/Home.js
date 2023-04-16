import React, { useContext } from "react";
import AuthContext from "../../store/authContext";
import AuthForm from "../Auth/AuthForm";
import Post from "../Feed/Post";
import MainHeader from "../Layout/MainHeader";

const Home = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <section>
      <MainHeader />
      {!isLoggedIn && <AuthForm />}

      {isLoggedIn && <Post />}
    </section>
  );
};

export default Home;
