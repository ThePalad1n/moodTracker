const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

module.exports = function(pool) {

  router.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const [rows, fields] = await pool.promise().query('CALL GetUserByEmail(?)', [email]);

    if (rows[0].length === 0 || !bcrypt.compareSync(password, rows[0][0].password)) {
      response.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    response.json({
      status: 'success',
      id: rows[0][0].id, // assuming `id` is contained in the first row's first object
      email: email
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
})

  return router;
};
