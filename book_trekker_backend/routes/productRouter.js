const express = require('express');
const router = express.Router();

//import routes
const {
  createProduct,
  productValidation,
  uploadProductPhoto,
  getProduct,
  productById
} = require('../controllers/productController');
const { isAdmin, requireSignin } = require('../controllers/authController');
const { userById } = require('../controllers/userController');

// routes
router.get('/:productId', getProduct)
router.post('/create/:userId', [
  requireSignin,
  isAdmin,
  uploadProductPhoto,
  productValidation,
  createProduct
]);



//pre middleware configuration
router.param('userId', userById);
router.param('productId', productById);




module.exports = router;