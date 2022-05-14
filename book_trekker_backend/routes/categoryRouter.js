const express = require('express');
const router = express.Router();

//import routes
const { isAdmin, requireSignin } = require('../controllers/authController');
const { createCategory, categoryValidation } = require('../controllers/categoryController');
const { userById } = require('../controllers/userController');



router.post('/create/:userId',
  [
    requireSignin,
    isAdmin,
    categoryValidation,
    createCategory
  ]);

router.param('userId', userById)



module.exports = router;