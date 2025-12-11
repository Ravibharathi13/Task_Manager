import { useState } from "react";
import API from "./api";
import "./auth.css";

function Auth({ setIsLoggedIn }) {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", {
        username: loginUsername,
        password: loginPassword,
      });

      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Login Failed", err);
    }
  };

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", {
        username: regUsername,
        password: regPassword,
      });

      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={regUsername}
          onChange={(e) => setRegUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={regPassword}
          onChange={(e) => setRegPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Auth;
