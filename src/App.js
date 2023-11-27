// App.js
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from '../src/components/Login';
import HomePage from '../src/components/HomePage';
import MoodTracker from '../src/components/MoodTracker';
import './App.css';


function App() {
    return (
      <div className="App">
      <header className="App-header">
        <Router>
            <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/moodtracker" element={<MoodTracker />} />
            <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>
        </header>
    </div>
    );
}

export default App;
