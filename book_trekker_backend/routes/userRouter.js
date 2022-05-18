const express = require('express');
const { requireSignin, isAuth, isAdmin } = require('../controllers/authController');
const router = express.Router();
const { userById, getUser } = require('../controllers/userController')


router.get('/:userId', [ requireSignin, isAuth, getUser ])

//route handler for reading user
router.param("userId", userById)


module.exports = router;