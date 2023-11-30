// LoginPage.js
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
        // Ensure the response contains the user's ID and email
        setCurrentUser({
          id: response.id, // Adjust these according to your API's response structure
          email: response.email,
        });
  
        navigate('/moodtracker');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  
  const goBackToHomePage = () => {
    navigate('/');
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
    <button onClick={goBackToHomePage}>Home</button>
    </div>
  );
};

export default LoginPage;
