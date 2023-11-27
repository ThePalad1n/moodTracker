// LoginPage.js
import React, { useState, Container } from "react";
import api from '../services/api';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await api.login(email, password);
    // handle response here (set user session, error messages etc)
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
 <br></br>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <br></br>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default LoginPage;