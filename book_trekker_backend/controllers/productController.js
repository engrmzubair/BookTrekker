const multer = require('multer')

//imports from other local directories
const catchAsync = require("../utils/catchAsync");
const { Product } = require('../models/productModel');
const AppError = require("../utils/appError");
const path = require('path');
const {
  fieldsValidation,
  categoryExists,
  multerOptions
} = require('../Helper/product/productValidation');

//product validation from client side
exports.productValidation = async (req, res, next) => {

  if (!req.file) next(new AppError('Please attach the product image!', 400));

  //fields validation
  fieldsValidation(req, res, next);

  //category validation
  categoryExists(req, res, next);
}

//multer middleware for parsing multipart form data
exports.uploadProductPhoto = multer(multerOptions).single('photo');


//route handler for create product
exports.createProduct = catchAsync(async (req, res, next) => {
  const product = new Product(req.productData)
  await product.save()
  res.send(product);
})

//route handler for get product by id
exports.getProductById = catchAsync(async (req, res, next) => {

  const _id = req.params.id;
  const product = await Product.findOne({ _id })
    .populate({ path: 'category', select: 'name' }); // key to populate

  if (!product) return next(new AppError("Invalid ProductID!", 400))

  const imagePath = `${ path.dirname(__dirname) }/public/products/${ product.photo }`

  res.send(product);
})


