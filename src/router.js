const express = require('express');
const router = express.Router();

const isLoggedIn = require('./middleware/verifyLogin');

const login = require('./routes/auth/login');
const CreateCompany = require('./routes/admin/new_company');
const CreateMember = require('./routes/admin/new_members');
const CreateWorker = require('./routes/admin/new_workers');

router.use('/login', login);

router.post('/CreateCompany', isLoggedIn, CreateCompany);
router.post('/CreateMembers', isLoggedIn, CreateMember);
router.post('/CreateWorkers', isLoggedIn, CreateWorker);



module.exports = router;