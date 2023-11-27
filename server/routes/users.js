const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
  // get the user list from the database using the global db variable
  db.query('SELECT * FROM Users', function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'users list.' });
  });
});

router.post('/users', (req, res) => {
  // parse user data from the request and add it to the users table in the database
  let user = req.body.user;
  if (!user) {
    return res.status(400).send({ error:true, message: 'Please provide user' });
  }
  db.query("INSERT INTO Users SET ? ", user, function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
  });
});

module.exports = router;