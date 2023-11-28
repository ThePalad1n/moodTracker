import React, { useState, useEffect } from 'react';
import Stack from './Stack';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import api from '../services/api'

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const MoodTracker = () => {
    const { currentUser } = useUser();
    console.log('Current User:', currentUser);
    const [moodStack, setMoodStack] = useState(new Stack());
    const [mood, setMood] = useState('');
    const [rating, setRating] = useState(5); // Default rating starts at 5

    const handleMoodChange = (event) => {
        setMood(event.target.value);
    };

    // Define handleRatingChange function here
    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };
    useEffect(() => {
        if (currentUser && currentUser.id) {
            loadPreviousMoods();
        }
    }, [currentUser]);

    const loadPreviousMoods = async () => {
        try {
            const moods = await api.getMoodsByUserId(currentUser.id);
            
            // Assume moods is an array of mood objects with 'mood', 'rating', and 'timestamp' properties
            const moodData = moods.map(mood => mood.rating);
            const moodLabels = moods.map(mood => new Date(mood.timestamp).toLocaleTimeString());

            setChartData({
                labels: moodLabels,
                datasets: [
                    {
                        label: 'Mood Rating',
                        data: moodData,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                    },
                ],
            });

            // Assuming you also want to fill the mood stack with previous entries
            const newStack = new Stack();
            newStack.items = moods.map(mood => ({ mood: mood.mood, rating: mood.rating }));
            setMoodStack(newStack);

        } catch (error) {
            console.error('Error loading previous moods', error);
        }
    };

    const addMood = async () => {
        if (!currentUser) {
          console.error('No current user found');
          return;
        }
        const newMoodEntry = { mood, rating: parseInt(rating, 10) };
        try {
          // Use api.addMood from api.js instead of axios.post directly
          await api.addMood(currentUser.id, newMoodEntry.mood, newMoodEntry.rating);
          // Rest of the code to update state...
        } catch (error) {
          console.error('Error adding mood entry', error);
        }
      
        const newStack = new Stack();
        newStack.items = [...moodStack.items, newMoodEntry];
        setMoodStack(newStack);

        // Add to chart data
        const newChartData = {
            ...chartData,
            labels: [...chartData.labels, new Date().toLocaleTimeString()], // Add a timestamp
            datasets: [
                {
                    ...chartData.datasets[0],
                    data: [...chartData.datasets[0].data, newMoodEntry.rating],
                },
            ],
        };
        setChartData(newChartData);

        setMood(''); // Reset mood input
        setRating(5); // Reset rating to default
    };

    const removeMood = () => {
        const newStack = new Stack();
        newStack.items = moodStack.items.slice(0, moodStack.size() - 1);
        setMoodStack(newStack);

        // Remove from chart data
        const newChartData = {
            ...chartData,
            labels: chartData.labels.slice(0, -1),
            datasets: [
                {
                    ...chartData.datasets[0],
                    data: chartData.datasets[0].data.slice(0, -1),
                },
            ],
        };
        setChartData(newChartData);
    };


    const [chartData, setChartData] = useState({
        labels: [], // This will be our timestamps
        datasets: [
            {
                label: 'Mood Rating',
                data: [], // This will be our mood ratings
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    });

    return (
        <div>
            <input type="text" value={mood} onChange={handleMoodChange} placeholder="How are you feeling?" />
            <input type="number" value={rating} onChange={handleRatingChange} min="1" max="10" />
            <button onClick={addMood}>Add Mood</button>
            <button onClick={removeMood} disabled={moodStack.isEmpty()}>Remove Mood</button>
            <div>
                <h2>Current Mood Stack:</h2>
                {moodStack.items.map((moodEntry, index) => (
                    <p key={index}>{moodEntry.mood} - Rating: {moodEntry.rating}</p>
                ))}
            </div>
            <div style={{ width: '600px', height: '400px' }}>
                <Line data={chartData} />
            </div>
        </div>

    );
};

export default MoodTracker;
