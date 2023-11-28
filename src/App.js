// App.js
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from '../src/components/Login';
import HomePage from '../src/components/HomePage';
import MoodTracker from '../src/components/MoodTracker';
import RegisterForm from '../src/components/RegisterForm';
import { UserProvider } from '../src/contexts/UserContext';
import './App.css';


function App() {
    return (
        <UserProvider>
      <div className="App">
      <header className="App-header">
        <Router>
            <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/moodtracker" element={<MoodTracker />} />
            <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>
        </header>
    </div>
    </UserProvider>
    );
}

export default App;
