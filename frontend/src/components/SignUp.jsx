import { useState } from "react";

export const SignUp = (props) => {
  // const onFormSwitch =()=>{
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h2>Sign Up</h2>
      <form
        onChange={(e) => e.target.value}
        onSubmit={handleSubmit}
        className="register-form"
      >
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          id="email"
          name="email"
          placeholder="email@email.com"
        />
        <label htmlFor="pass">Password</label>
        <input
          onChange={(e) => {
            setPass(e.target.value);
          }}
          value={pass}
          type="pass"
          id="pass"
          name="pass"
          placeholder="email@email.com"
        />
        <button type="submit">Sign Up</button>
        <button
          onClick={() => props.onFormSwitch("login")}
          className="link-btn"
        >
          Already have an account? Login here
        </button>
      </form>
    </div>
  );
};
