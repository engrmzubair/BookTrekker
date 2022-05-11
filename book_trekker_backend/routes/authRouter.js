const express = require('express');
const router = express.Router();
const
  {
    signup,
    signupValidation,
    signin,
    signout,
    requireSignin,
  }
    = require('../controllers/authController')


//get all users
router.post('/signup', [ signupValidation, signup ]);
router.post('/signin', signin);
router.get('/signout', signout);


module.exports = router;