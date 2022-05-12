const express = require('express');
const { isAdmin, requireSignin } = require('../controllers/authController');
const router = express.Router();
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