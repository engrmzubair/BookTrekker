const express = require('express');
const router = express.Router();
const { getUsers, signup, userValidation, userRegistered } = require('../controllers/userController')


//get all users
router.get('/', getUsers);
router.post('/signup',
  [
    userValidation,
    userRegistered,
    signup
  ]
);


module.exports = router;