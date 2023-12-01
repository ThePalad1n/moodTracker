import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Stack from './Stack';
import Queue from './Queue'; // Import Queue class
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
import '../moodTracker.css';
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
    const [moodDataStructure, setMoodDataStructure] = useState(new Stack());
    const [dataStructureType, setDataStructureType] = useState('stack');
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

    const loadDataStructure = useCallback((structureType, moods) => {
        const ds = structureType === 'stack' ? new Stack() : new Queue();
        moods.forEach(mood => {
            if (structureType === 'stack') {
                ds.push(mood);
            } else {
                ds.enqueue(mood);
            }
        });
        setMoodDataStructure(ds);
    }, []);

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

            loadDataStructure(dataStructureType, moods);
        } catch (error) {
            console.error('Error loading previous moods', error);
        }
    }, [currentUser, dataStructureType, loadDataStructure]);

    useEffect(() => {
        loadPreviousMoods();
    }, [currentUser, loadPreviousMoods]);

    const handleDataStructureChange = (event) => {
        setDataStructureType(event.target.value);
        loadDataStructure(event.target.value, moodDataStructure.items);
    };

    const addMood = async () => {
        if (!currentUser) {
            console.error('No current user found');
            return;
        }

        const newMoodEntry = { mood, rating: parseInt(rating, 10) };

        try {
            await api.addMood(currentUser.id, newMoodEntry.mood, newMoodEntry.rating);

            if (dataStructureType === 'stack') {
                moodDataStructure.push(newMoodEntry);
            } else {
                moodDataStructure.enqueue(newMoodEntry);
            }

            setMoodDataStructure(moodDataStructure);

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

    const removeMood = async () => {
        console.log('Current Mood Data Structure:', moodDataStructure.items);
        if (moodDataStructure.isEmpty()) {
            console.error('No moods to remove');
            return;
        }
    
        
        let moodToRemove;


        console.log('Data Structure Type:', dataStructureType);
        if (dataStructureType === 'stack') {
            console.log("stack");
            moodToRemove = moodDataStructure.pop();
            moodToRemove.id = moodDataStructure.size();
        } else {
            console.log("queue");
            moodToRemove = moodDataStructure.dequeue();
            moodToRemove.id = moodDataStructure.size()
        }

        console.log('Mood to remove:', moodToRemove);
        
        if (!moodToRemove || !moodToRemove.id) {
            console.error('Invalid mood entry or missing ID');
            return;
        }


        try {
            await api.removeMood(moodToRemove.id);
            setMoodDataStructure(moodDataStructure);
            
            // Update chart data...
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
        } catch (error) {
            console.error('Error removing mood entry', error);
        }
    };

    const navigate = useNavigate();

    const returnToHomePage = () => {
        navigate('/'); // Update the path according to your home page route
    };


    return (
        <div>
            <select value={dataStructureType} onChange={handleDataStructureChange} className="input-select">
                <option value="stack">Stack</option>
                <option value="queue">Queue</option>
            </select>
            <input type="text" value={mood} onChange={handleMoodChange} placeholder="How are you feeling?" className="input-text" />
            <input type="number" value={rating} onChange={handleRatingChange} min="1" max="10" className="input-number" />
            <button onClick={addMood} className="btn">Add Mood</button>
            <button onClick={removeMood} disabled={moodDataStructure.isEmpty()} className="btn">Remove Mood</button>
            <div>
                <h2>Current Mood Data:</h2>
                <div className="scrollable-mood-list">
                    {moodDataStructure.items.map((moodEntry, index) => (
                        <p key={index}>{moodEntry.mood} - Rating: {moodEntry.rating}</p>
                    ))}
                </div>
            </div>
            <div>
                <Line data={chartData} />
            </div>
            <button onClick={returnToHomePage} className="btn">Home</button>
        </div>
    );
    
};

export default MoodTracker;