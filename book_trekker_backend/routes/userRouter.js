const express = require('express');
const router = express.Router();
const { getUsers, signup, userValidation } = require('../controllers/userController')


//get all users
router.get('/', getUsers);
router.post('/signup', [ userValidation, signup ]);


module.exports = router;