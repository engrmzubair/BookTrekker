const express = require('express');
const router = express.Router();

//import routes
const { createProduct, productValidation, uploadProductPhoto, getProductById, test } = require('../controllers/productController');
const { isAdmin, requireSignin } = require('../controllers/authController');
const { userById } = require('../controllers/userController');

router.post('/create/:userId', [
  requireSignin,
  isAdmin,
  uploadProductPhoto,
  productValidation,
  createProduct
]);

router.get('/:id', getProductById)
router.param('userId', userById)



module.exports = router;