import React, { useState } from 'react';
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
    const [moodEntries, setMoodEntries] = useState({});
    const [mood, setMood] = useState('');
    const [rating, setRating] = useState(5); // Default rating starts at 5
    const [selectedMoodTimestamp, setSelectedMoodTimestamp] = useState('');

    const handleMoodChange = (event) => {
        setMood(event.target.value);
    };

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleMoodSelection = (event) => {
        setSelectedMoodTimestamp(event.target.value);
    };

    const addMood = () => {
        const timestamp = new Date().toISOString();
        const newMoodEntry = { mood, rating: parseInt(rating, 10) };
        setMoodEntries({...moodEntries, [timestamp]: newMoodEntry});

        updateChartData(timestamp, newMoodEntry.rating);

        setMood(''); // Reset mood input
        setRating(5); // Reset rating to default
    };

    const removeMood = () => {
        const {[selectedMoodTimestamp]: _, ...rest} = moodEntries;
        setMoodEntries(rest);

        updateChartData();

        setSelectedMoodTimestamp('');
    };

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Mood Rating',
                data: [],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    });

    const updateChartData = (timestamp = null, rating = null) => {
        const labels = timestamp ? [...chartData.labels, timestamp] : chartData.labels.filter(label => label !== selectedMoodTimestamp);
        const data = timestamp ? [...chartData.datasets[0].data, rating] : chartData.datasets[0].data.filter((_, index) => chartData.labels[index] !== selectedMoodTimestamp);

        setChartData({
            ...chartData,
            labels,
            datasets: [
                {
                    ...chartData.datasets[0],
                    data,
                },
            ],
        });
    };

    return (
        <div>
            <input type="text" value={mood} onChange={handleMoodChange} placeholder="How are you feeling?" />
            <input type="number" value={rating} onChange={handleRatingChange} min="1" max="10" />
            <button onClick={addMood}>Add Mood</button>

            <select value={selectedMoodTimestamp} onChange={handleMoodSelection}>
                <option value="">Select a mood to remove...</option>
                {Object.keys(moodEntries).map(timestamp => (
                    <option key={timestamp} value={timestamp}>
                        {`${moodEntries[timestamp].mood} - Rating: ${moodEntries[timestamp].rating} (${timestamp})`}
                    </option>
                ))}
            </select>
            <button onClick={removeMood} disabled={!selectedMoodTimestamp}>Remove Selected Mood</button>

            <div style={{ width: '600px', height: '400px' }}>
                <Line data={chartData} />
            </div>
        </div>
    );
};

export default MoodTracker;
