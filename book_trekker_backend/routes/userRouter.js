const express = require('express');
const { requireSignin, isAuth, isAdmin } = require('../controllers/authController');
const router = express.Router();
const { userById, getUser, getProfile, getUserById, updateUser } = require('../controllers/userController');

//route handler for getting profile;
router.get('/me', [ requireSignin, getProfile ])

//get user by id ;
router.get('/:userId', [ requireSignin, isAuth, getUserById ])

//update user
router.put('/:userId', [ requireSignin, isAuth, updateUser ])

//route handler for reading user
router.param("userId", userById);


module.exports = router;