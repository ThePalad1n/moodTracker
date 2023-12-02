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
  database: 'moodtracker',
  waitForConnections: true,
  connectionLimit: 10,
});

global.db = pool;





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

// const journalRoutes = require('./routes/journal')(pool); // Require the journal routes
// app.use('/api/journal', journalRoutes); // Use journal routes on the '/api/journal' endpoint

console.log('Good to go.');

app.listen(port, () => console.log(`Server is running on port ${port}`));


