const express = require('express');
const router = express.Router();
const
  {
    getUsers,
    signup,
    signupValidation,
    signin,
  }
    = require('../controllers/userController')


//get all users
router.get('/', getUsers);
router.post('/signup', [ signupValidation, signup ]);
router.post('/signin', signin);


module.exports = router;