const express = require('express');
const router = express.Router();

const isLoggedIn = require('./middleware/verifyLogin');

const login = require('./routes/auth/login');



router.use('/login', login);


module.exports = router;