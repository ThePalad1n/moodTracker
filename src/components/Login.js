import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useUser } from '../contexts/UserContext';

function LoginPage() {
  const { setCurrentUser } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.login(email, password);
      console.log('Login successful', response);

      if (response.status === 'success') {
        setCurrentUser({
          id: response.id,
          email: response.email,
        });

        navigate('/moodtracker');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleRegister = () => {
    navigate('/register'); // You may need to adjust the path to your actual registration route
  };

  return (
    <div className="login-container">
      <h1>Welcome to MoodTracker</h1>
      <p>Please sign in to track your mood.</p>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="form-control"
            />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="form-control"
            />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <br></br>
        <button type="button" className="btn btn-secondary" onClick={handleRegister}>
          Register New Account
        </button>
      </form>
    </div>
  );
};

export default LoginPage;