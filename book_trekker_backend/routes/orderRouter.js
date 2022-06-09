const express = require('express');
const { requireSignin, isAuth, isAdmin } = require('../controllers/authController');
const { userById, addOrderToUserHistory } = require('../controllers/userController');
const router = express.Router();

const { createOrder, getOrders } = require('../controllers/orderController');
const { decreaseQuantity } = require('../controllers/productController');



router.post('/create/:userId', [ requireSignin, isAuth, addOrderToUserHistory, decreaseQuantity, createOrder ]);

router.get('/get/:userId', [ requireSignin, isAuth, isAdmin, getOrders ]);



router.param('userId', userById)





module.exports = router;