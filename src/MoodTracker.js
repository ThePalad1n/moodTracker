import React, { useState } from 'react';
import Stack from './Stack';

const MoodTracker = () => {
  const [moodStack, setMoodStack] = useState(new Stack());
  const [mood, setMood] = useState('');

  const handleMoodChange = (event) => {
    setMood(event.target.value);
  };

  const addMood = () => {
    const newStack = new Stack();
    newStack.items = [...moodStack.items, mood];
    setMoodStack(newStack);
    setMood('');
  };

  const removeMood = () => {
    const newStack = new Stack();
    newStack.items = moodStack.items.slice(0, moodStack.size() - 1);
    setMoodStack(newStack);
  };

  return (
    <div>
      <input type="text" value={mood} onChange={handleMoodChange} />
      <button onClick={addMood}>Add Mood</button>
      <button onClick={removeMood} disabled={moodStack.isEmpty()}>Remove Mood</button>
      <div>
        <h2>Current Mood Stack:</h2>
        {moodStack.items.map((mood, index) => (
          <p key={index}>{mood}</p>
        ))}
      </div>
    </div>
  );
};

export default MoodTracker;
