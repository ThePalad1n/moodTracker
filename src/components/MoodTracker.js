import React, { useState, useEffect, useCallback } from 'react';
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
import { useUser } from '../contexts/UserContext';
import api from '../services/api';

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
    const [moodStack, setMoodStack] = useState(new Stack());
    const [mood, setMood] = useState('');
    const [rating, setRating] = useState(5);
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

    const handleMoodChange = (event) => {
        setMood(event.target.value);
    };

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const loadPreviousMoods = useCallback(async () => {
        if (!currentUser || !currentUser.id) return;

        try {
            const moods = await api.getMoodsByUserId(currentUser.id);
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

            setMoodStack(new Stack());
            setMoodStack(prevStack => {
                const newStack = new Stack();
                newStack.items = moods.map(mood => ({ mood: mood.mood, rating: mood.rating }));
                return newStack;
            });
        } catch (error) {
            console.error('Error loading previous moods', error);
        }
    }, [currentUser]);

    useEffect(() => {
        loadPreviousMoods();
    }, [currentUser, loadPreviousMoods]);

    const addMood = async () => {
        if (!currentUser) {
            console.error('No current user found');
            return;
        }

        const newMoodEntry = { mood, rating: parseInt(rating, 10) };

        try {
            await api.addMood(currentUser.id, newMoodEntry.mood, newMoodEntry.rating);

            setMoodStack(prevStack => {
                const newStack = new Stack();
                newStack.items = [...prevStack.items, newMoodEntry];
                return newStack;
            });

            setChartData(prevChartData => ({
                ...prevChartData,
                labels: [...prevChartData.labels, new Date().toLocaleTimeString()],
                datasets: [
                    {
                        ...prevChartData.datasets[0],
                        data: [...prevChartData.datasets[0].data, newMoodEntry.rating],
                    },
                ],
            }));

            setMood('');
            setRating(5);
        } catch (error) {
            console.error('Error adding mood entry', error);
        }
    };

    const removeMood = () => {
        setMoodStack(prevStack => {
            const newStack = new Stack();
            newStack.items = prevStack.items.slice(0, prevStack.size() - 1);
            return newStack;
        });

        setChartData(prevChartData => ({
            ...prevChartData,
            labels: prevChartData.labels.slice(0, -1),
            datasets: [
                {
                    ...prevChartData.datasets[0],
                    data: prevChartData.datasets[0].data.slice(0, -1),
                },
            ],
        }));
    };

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
