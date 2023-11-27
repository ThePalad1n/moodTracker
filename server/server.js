const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const port = 3001;
const app = express();

app.use(cors());

// server.js

const loginRoute = require('./routes/login');
app.use('/api/login', loginRoute);



// No need to check for environment,
// we can directly serve the build folder.
app.use(express.static(path.join(__dirname, './client/build')));

// Setup a fallback for all other GET requests
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'moodtracker',
  waitForConnections: true,
  connectionLimit: 10,
});

global.db = pool;

pool.query(`
  CREATE TABLE IF NOT EXISTS User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50),
    password VARCHAR(255) 
  )`, (err, results) => {
    if(err) throw err;
    console.log('User table created / already exists.');
  });


  console.log('User table created / already exists.');

// Hash a password in a cost-efficient way for your system
bcrypt.hash('your_password', saltRounds, function(err, hashedPassword) {
  if (err) {
    console.error(err);
    return;
  }

  // Insert a test user
  pool.query(`
    INSERT INTO User (email, password) 
    VALUES (?, ?)
    ON DUPLICATE KEY 
    UPDATE password = VALUES(password)
  `, ['testuser@example.com', hashedPassword], (err, results) => {
    if (err) throw err;
    console.log('Test user inserted / updated.');
  });
});

// Enable parsing of JSON bodies from POST requests
app.use(express.json());

// Import routes
const userRoutes = require('./routes/users');
const loginRoutes = require('./routes/login'); // Adjust as needed if your file structure is different

app.use('/api/login', loginRoutes);
// Use the routes
app.use('/api', userRoutes);  // Any routes specified in users.js will now be prefixed with /api

app.listen(port, () => console.log(`Server is running on port ${port}`));