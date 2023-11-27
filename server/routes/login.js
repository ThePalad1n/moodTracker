const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/', async (request, response) => {
  const { email, password } = request.body;

  // Fetch the user by email from the SQL database
  const [rows, fields] = await pool.promise().query('SELECT * FROM Users WHERE email = ?', [email]);

  // If a user with this email was not found or their password is incorrect, send an error
  if (rows.length === 0 || !bcrypt.compareSync(password, rows[0].password)) {
    response.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  // If we made it here, the login was successful
  // In a real app, here's where you'd start a session for this user
  response.json({ status: 'success' });
});

module.exports = router;