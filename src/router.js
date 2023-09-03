const express = require('express');
const router = express.Router();

const isLoggedIn = require('./middleware/verifyLogin');

const login = require('./routes/auth/login');
const CreateCompany = require('./routes/admin/new_company');
const CreateMember = require('./routes/admin/new_members');
const CreateWorker = require('./routes/admin/new_workers');
const GetCompanies = require('./routes/admin/get_companies');
const GetHomeStats = require('./routes/admin/get_home_stats');

router.use('/login', login);

router.post('/CreateCompany', isLoggedIn, CreateCompany);
router.post('/CreateMembers', isLoggedIn, CreateMember);
router.post('/CreateWorkers', isLoggedIn, CreateWorker);
router.get('/GetCompanies', isLoggedIn, GetCompanies);
router.get('/GetHomeStats', isLoggedIn, GetHomeStats);



module.exports = router;