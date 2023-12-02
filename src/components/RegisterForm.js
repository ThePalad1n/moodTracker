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
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    const handleLogin = () => {
        navigate('/login'); // Adjust with your login route if needed
    };

    return (
        <div className="register-container">
            <h1>Create an Account</h1>
            <p>Get started with tracking your mood today.</p>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label htmlFor="register-email">Email Address</label>
                    <input 
                        id="register-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="register-password">Password</label>
                    <input 
                        id="register-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password"
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
                <br></br>
                <button type="button" className="btn btn-link" onClick={handleLogin}>
                    Already have an account? Log In
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;