const express = require('express');
const { requireSignin, isAuth } = require('../controllers/authController');
const { userById, addOrderToUserHistory } = require('../controllers/userController');
const router = express.Router();

const { createOrder, sayHello } = require('../controllers/orderController');
const { decreaseQuantity } = require('../controllers/productController');



router.post('/create/:userId', [ requireSignin, isAuth, addOrderToUserHistory, decreaseQuantity, createOrder ])
router.get('/hello', [ sayHello ])



router.param('userId', userById)





module.exports = router;