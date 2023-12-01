// src/components/RegisterForm.js

import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import api from '../services/api'; // Adjust the path according to your project structure

const RegisterForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.register(email, password);
            console.log('Registration successful', response);
            if (response.status === 'success') {
                navigate('/login');
            }
            // Handle successful registration (e.g., redirect to login page)
        } catch (error) {
            console.error('Registration failed', error);
            // Handle error (e.g., display error message)
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
            <button type="submit">Register</button>
        </form>
        <button onClick={goBackToHomePage}>Home</button>
        </div>
    );
};

export default RegisterForm;
