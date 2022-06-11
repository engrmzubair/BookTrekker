const express = require('express');
const { requireSignin, isAuth, isAdmin } = require('../controllers/authController');
const { userById } = require('../controllers/userController');
const router = express.Router();

const {
  createOrder,
  getOrders,
  getStatusValues,
  orderById,
  updateOrderStatus,
  purchaseHistory
} = require('../controllers/orderController');
const { decreaseQuantity } = require('../controllers/productController');



router.post('/create/:userId', [
  requireSignin,
  isAuth,
  decreaseQuantity,
  createOrder ]);

router.get('/get/:userId', [ requireSignin, isAuth, isAdmin, getOrders ]);

router.get('/by/user/:userId', [ requireSignin, isAuth, purchaseHistory ]);

router.get('/status-values/:userId', [ requireSignin, isAuth, isAdmin, getStatusValues ]);

router.put('/:orderId/status/:userId', [ requireSignin, isAuth, isAdmin, updateOrderStatus ]);


router.param('userId', userById)
router.param('orderId', orderById)





module.exports = router;