// components/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';


function HomePage() {
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate('/login'); // Update the path according to your routing setup
  };

  //this will be removed in the final version, just for testing now
  const goMoodTracker = () => {
    navigate('/moodtracker'); 
  };

  const goRegister = () => {
    navigate('/register'); 
  };
  return (
    <div>
      <h1>Welcome to Mood Tracker!</h1>
      <button onClick={goToLoginPage}>Login</button>
      <button onClick={goRegister}>Register</button>
      <br></br>
      <button onClick={goMoodTracker}>Mood Tracker</button>

    </div>
    
  );
}

export default HomePage;
