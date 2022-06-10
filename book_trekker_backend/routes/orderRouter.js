const express = require('express');
const { requireSignin, isAuth, isAdmin } = require('../controllers/authController');
const { userById, addOrderToUserHistory } = require('../controllers/userController');
const router = express.Router();

const {
  createOrder,
  getOrders,
  getStatusValues,
  orderById,
  updateOrderStatus
} = require('../controllers/orderController');
const { decreaseQuantity } = require('../controllers/productController');



router.post('/create/:userId', [ requireSignin, isAuth, addOrderToUserHistory, decreaseQuantity, createOrder ]);

router.get('/get/:userId', [ requireSignin, isAuth, isAdmin, getOrders ]);

router.get('/status-values/:userId', [ requireSignin, isAuth, isAdmin, getStatusValues ]);

router.post('/:orderId/status/:userId', [ requireSignin, isAuth, isAdmin, updateOrderStatus ]);


router.param('userId', userById)
router.param('orderId', orderById)





module.exports = router;