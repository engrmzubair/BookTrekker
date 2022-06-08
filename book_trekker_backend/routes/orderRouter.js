const express = require('express');
const { requireSignin, isAuth } = require('../controllers/authController');
const { userById } = require('../controllers/userController');
const router = express.Router();

const { createOrder, sayHello } = require('../controllers/orderController');



router.post('/create/:userId', [ requireSignin, isAuth, createOrder ])
router.get('/hello', [ sayHello ])



router.param('userId', userById)





module.exports = router;