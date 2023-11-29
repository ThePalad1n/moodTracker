// routes/mood.js
const express = require('express');
const router = express.Router();


module.exports = function(pool) {
  router.post('/add', async (req, res) => {
    const { userId, mood, rating } = req.body;
    const timestamp = new Date(); // Current datetime
    try {
      await pool.promise().query('INSERT INTO MoodEntries (userId, mood, rating, timestamp) VALUES (?, ?, ?, ?)', [userId, mood, rating, timestamp]);
      res.json({ success: true });
      console.log("mood entered")
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
  router.delete('/remove/:moodId', async (req, res) => {
    const { moodId } = req.params;

    try {
        await pool.promise().query('DELETE FROM MoodEntries WHERE id = ?', [moodId]);
        res.json({ success: true, message: 'Mood removed' });
    } catch (error) {
        console.error('Error removing mood entry:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


  router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
    console.log('Fetching moods for user:', userId);
    console.log('Received request for user ID:', req.params.userId);
    try {
      console.log('try request for user ID:', req.params.userId);
      const [moods] = await pool.promise().query('SELECT mood, rating, timestamp FROM MoodEntries WHERE userId = ?', [userId]);
      res.json(moods);
    } catch (error) {
      console.error('Error fetching mood entries:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  return router;
};