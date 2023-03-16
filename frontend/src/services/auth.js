// Ici je dois mettre la logique sign in + deconection
// connecter le front aux backend
import { useEffect } from "react";

export const login = () => {
  useEffect(() => {
    fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "john.doe@example3.com",
        password: "password123",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []);
};
