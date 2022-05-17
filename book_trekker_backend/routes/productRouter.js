const express = require('express');
const router = express.Router();

//import routes
const {
  createProduct,
  productValidation,
  uploadProductPhoto,
  getProduct,
  productById,
  updateProduct,
  deleteProduct,
  getProducts,
  getRelatedProducts,
  getProductCategories
} = require('../controllers/productController');
const { isAdmin, requireSignin, isAuth } = require('../controllers/authController');
const { userById } = require('../controllers/userController');


//array of common used middleware for create and update controller
const common = [ requireSignin, isAuth, isAdmin, uploadProductPhoto, productValidation ];

//array of common used middleware for delete controller
const commonForDelete = [ requireSignin, isAuth, isAdmin ];

// routes
router.get('/', getProducts);
router.get('/categories', getProductCategories);
router.get('/related/:productId', getRelatedProducts);
router.get('/:productId', getProduct)
router.post('/create/:userId', [ ...common, createProduct ]);
router.put('/:productId/:userId', [ ...common, updateProduct ]);
router.delete('/:productId/:userId', [ ...commonForDelete, deleteProduct ]);

//pre middleware configuration
router.param('userId', userById);
router.param('productId', productById);


module.exports = router;