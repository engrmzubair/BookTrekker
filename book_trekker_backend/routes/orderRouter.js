const express = require('express');
const { requireSignin, isAuth } = require('../controllers/authController');
const { userById, addOrderToUserHistory } = require('../controllers/userController');
const router = express.Router();

const { createOrder, sayHello } = require('../controllers/orderController');



router.post('/create/:userId', [ requireSignin, isAuth, addOrderToUserHistory, createOrder ])
router.get('/hello', [ sayHello ])



router.param('userId', userById)





module.exports = router;