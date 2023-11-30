const express = require('express');
const cors = require('cors');
const path = require('path');

const port = 3001;
const app = express();

app.use(cors());


const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'MoodTracker',
  waitForConnections: true,
  connectionLimit: 10,
});

global.db = pool;

pool.query(`
CREATE TABLE IF NOT EXISTS Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50),
    password VARCHAR(255) 
  )`, (err, results) => {
    if(err) throw err;
    console.log('User table created / already exists.');
  });


  console.log('User table created / already exists.');



// Enable parsing of JSON bodies from POST requests
app.use(express.json());
const loginRoutes = require('./routes/login')(pool);
app.use('/api/login', loginRoutes);
const registerRoutes = require('./routes/register')(pool); // Ensure this path is correct
app.use('/api/register', registerRoutes);
const userRoutes = require('./routes/users');
app.use('/api', userRoutes); 
const moodRoutes = require('./routes/mood')(pool); 
app.use('/api/mood', moodRoutes);


app.listen(port, () => console.log(`Server is running on port ${port}`));


