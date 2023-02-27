import "../style/login-signUp.css";
import { useState } from "react";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <div>
      <h2>login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => {
            // modification du hooks useState
            setEmail(e.target.value);
            console.log(e);
          }}
          type="email"
          id="email"
          name="email"
          placeholder="email@email.com"
        />
        <label htmlFor="pass">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="pass"
          id="pass"
          name="pass"
          placeholder="email@email.com"
        />
        <button type="submit">Login</button>
        <button
          onClick={() => props.onFormSwitch("SignUp")}
          className="link-btn"
        >
          Don't have an account? Register here
        </button>
      </form>
    </div>
  );
};
