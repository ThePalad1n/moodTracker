import React, { useState } from 'react';
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
    const [moodStack, setMoodStack] = useState(new Stack());
    const [mood, setMood] = useState('');
    const [rating, setRating] = useState(5); // Default rating starts at 5

    const handleMoodChange = (event) => {
        setMood(event.target.value);
    };

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const addMood = () => {
        const newStack = new Stack();
        const newMoodEntry = { mood, rating: parseInt(rating, 10) }; // Parse rating to be a number
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
