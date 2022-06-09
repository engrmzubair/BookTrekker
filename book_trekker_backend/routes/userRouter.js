const express = require('express');
const { requireSignin, isAuth, isAdmin } = require('../controllers/authController');
const router = express.Router();
const { userById, getUser, getProfile } = require('../controllers/userController');

//route handler for getting profile;
router.get('/me', [ requireSignin, getProfile ])

//route handler for reading user
router.param("userId", userById);


module.exports = router;