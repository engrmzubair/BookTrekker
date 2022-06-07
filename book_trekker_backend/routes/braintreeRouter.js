const express = require('express');
const { requireSignin, isAuth } = require('../controllers/authController');
const { generateToken, processPayment } = require('../controllers/brainTreeController');
const { userById } = require('../controllers/userController');
const router = express.Router();



router.get('/getToken/:userId', [ requireSignin, isAuth, generateToken ])
router.post('/payment/:userId', [ requireSignin, isAuth, processPayment ])



router.param('userId', userById)





module.exports = router;