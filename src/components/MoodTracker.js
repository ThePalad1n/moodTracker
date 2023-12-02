import React, { useState, useEffect, useCallback } from 'react';
import Stack from './Stack';
import Queue from './Queue';
import { Line, Bar } from 'react-chartjs-2';
import { useUser } from '../contexts/UserContext';
import api from '../services/api';
import { Container, Form, Button } from 'react-bootstrap';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);



const MoodTracker = () => {
    const { currentUser } = useUser();
    const [moodDataStructure, setMoodDataStructure] = useState(new Stack());
    const [dataStructureType, setDataStructureType] = useState('stack');
    const [moodFrequency, setMoodFrequency] = useState({});
    const [mood, setMood] = useState('');
    const [rating, setRating] = useState(5);
    const [lineChartData, setLineChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Mood Rating',
                data: [],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            }
        ]
    });
    const [barChartData, setBarChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Mood Frequencies',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
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
        const frequencyMap = {};

        moods.forEach(mood => {
            const ratingStr = mood.rating.toString();
            frequencyMap[ratingStr] = (frequencyMap[ratingStr] || 0) + 1;

            if (structureType === 'stack') {
                ds.push(mood);
            } else {
                ds.enqueue(mood);
            }
        });

        setMoodDataStructure(ds);
        setMoodFrequency(frequencyMap);
    }, []);

    const updateLineChartData = (moodLabels, moodData) => {
        setLineChartData({
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
    };

    const loadPreviousMoods = useCallback(async () => {
        if (!currentUser || !currentUser.id) return;

        try {
            const moods = await api.getMoodsByUserId(currentUser.id);
            const moodData = moods.map(mood => mood.rating);
            const moodLabels = moods.map(mood => new Date(mood.timestamp).toLocaleTimeString());

            updateLineChartData(moodLabels, moodData);
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
        const newChartData = { // Create new chart data with the added mood
            labels: [...lineChartData.labels, new Date().toLocaleTimeString()],
            datasets: [
                {
                    ...lineChartData.datasets[0],
                    data: [...lineChartData.datasets[0].data, newMoodEntry.rating],
                },
            ],
        };

        setLineChartData(newChartData);
        try {
            await api.addMood(currentUser.id, newMoodEntry.mood, newMoodEntry.rating);

            if (dataStructureType === 'stack') {
                moodDataStructure.push(newMoodEntry);
            } else {
                moodDataStructure.enqueue(newMoodEntry);
            }

            setMoodDataStructure(moodDataStructure);

            setMoodFrequency(prevFrequency => {
                const ratingStr = newMoodEntry.rating.toString();
                return {
                    ...prevFrequency,
                    [ratingStr]: (prevFrequency[ratingStr] || 0) + 1,
                };
            });
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
        console.log('Mood to remove:', moodToRemove);

        const lastLabelIndex = lineChartData.labels.length - 1; // Get the index of the last label

        const newChartData = { // Create new chart data without the removed mood
            labels: lineChartData.labels.slice(0, lastLabelIndex),
            datasets: [
                {
                    ...lineChartData.datasets[0],
                    data: lineChartData.datasets[0].data.slice(0, lastLabelIndex),
                },
            ],
        };

        setLineChartData(newChartData);

        if (dataStructureType === 'stack') {
            console.log("stack");
            moodToRemove = moodDataStructure.pop();
        } else {
            console.log("queue");
            moodToRemove = moodDataStructure.dequeue();
        }
    
        if (!moodToRemove || !moodToRemove.id) {
            console.error('Invalid mood entry or missing ID');
            return;
        }


        try {
            await api.removeMood(moodToRemove.id);
            setMoodDataStructure(moodDataStructure);
        } catch (error) {
            console.error('Error removing mood entry', error);
        }

        setMoodFrequency(prevFrequency => {
            const ratingStr = moodToRemove.rating.toString();
            const updatedCount = (prevFrequency[ratingStr] || 1) - 1;
            if (updatedCount <= 0) {
                const { [ratingStr]: _, ...restFrequency } = prevFrequency;
                return restFrequency;
            } else {
                return {
                    ...prevFrequency,
                    [ratingStr]: updatedCount,
                };
            }
        });
    };

    const updateBarChartData = (moodFrequency) => {
        setBarChartData({
            labels: Object.keys(moodFrequency).sort(),
            datasets: [
                {
                    label: 'Mood Frequencies',
                    data: Object.keys(moodFrequency).sort().map(key => moodFrequency[key]),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                }
            ]
        });
    };

    useEffect(() => {
        updateBarChartData(moodFrequency);
    }, [moodFrequency]);

    const displayMoodFrequency = () => {
        return Object.entries(moodFrequency).map(([rating, count]) => (
            <p key={rating}>Rating: {rating} - Count: {count}</p>
        ));
    };

    function truncateEmail(email) {
        // Inside a component
        return email.split('@')[0];
      }


        const [entry, setEntry] = useState('');
      
        const handleSubmit = async (event) => {
            event.preventDefault();
          
            if (currentUser && currentUser.id) {
              try {
                // Call the API to save the journal entry for the current user
                await api.createJournalEntry(currentUser.id, entry);
          
                // Clear the form input after submission
                setEntry('');
          
                // Optionally, fetch the updated list of journal entries
                // loadJournalEntries(); // A function that you would implement to update the journal entries display
              } catch (error) {
                console.error('Error saving journal entry:', error);
              }
            } else {
              console.error('No current user found');
            }
          };
    


    return (
        <>
        <Container>
            <br></br>
                <h2>Welcome {currentUser ? truncateEmail(currentUser.email) : 'Guest'}!</h2>
                <br></br>
            <div>
                <div>
                    <select value={dataStructureType} onChange={handleDataStructureChange}>
                        <option value="stack">Stack</option>
                        <option value="queue">Queue</option>
                    </select>
                    <input type="text" value={mood} onChange={handleMoodChange} placeholder="How are you feeling?" />
                    <input type="number" value={rating} onChange={handleRatingChange} min="1" max="10" />
                    <button onClick={addMood}>Add Mood</button>
                    <button onClick={removeMood} disabled={moodDataStructure.isEmpty()}>Remove Mood</button>
                </div>
                <br></br><br></br>
            <div>
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <div style={{ flex: 1, paddingRight: '10px' }}>
                        <h2>Current Mood Data:</h2>
                        <br></br>
                        <div style={{ maxHeight: '200px', overflowY: 'auto'}}>
                            {moodDataStructure.items.map((moodEntry, index) => (
                                <p key={index}>{moodEntry.mood} - Rating: {moodEntry.rating}</p>
                            ))}
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <Line data={lineChartData} />
                    </div>
                </div>
                <br></br>
                <br></br>
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <div style={{ flex: 1, paddingRight: '10px' }}>
                        <h2>Mood Frequencies</h2>
                        {displayMoodFrequency()}
                    </div>
                    <div style={{ flex: 1 }}>
                        <Bar data={barChartData} />
                    </div>
                </div>
            </div>
            </div>
        </Container>
        <br></br>
        <Container>
      <h1>My Journal</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="journalEntry">
          <Form.Label>Write your journal entry</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="What's on your mind today?"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save Entry
        </Button>
      </Form>
    </Container>
    <br></br>
  </>
    );
};

export default MoodTracker;