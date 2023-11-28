// routes/register.js

const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router();

module.exports = function(pool) {
    router.post('/', async (req, res) => {  // Changed from '/register' to '/'
        try {
            const { email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
    
            // Call the stored procedure and capture the OUT parameter
            await pool.promise().query('CALL CreateUser(?, ?, @userUuid)', [email, hashedPassword]);
            const [uuidResults] = await pool.promise().query('SELECT @userUuid AS uuid');
    
            res.json({ status: 'success', uuid: uuidResults[0].uuid });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    return router;
};