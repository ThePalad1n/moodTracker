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
  router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
      const [moods] = await pool.promise().query('SELECT mood, rating, timestamp FROM MoodEntries WHERE userId = ?', [userId]);
      res.json(moods[0]);
    } catch (error) {
      console.error('Error fetching mood entries:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  



  return router;
};