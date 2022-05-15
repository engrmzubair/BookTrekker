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

//pre middleware for getting product and set in req object
exports.productById = (req, res, next, _id) => {

  //find product => if found assign it to req object
  Product.findOne({ _id }).exec((err, product) => {

    // res.send(product)
    if (!product || err) return next(new AppError('Invalid product id!', 400))

    req.product = product;
    next();
  })
}

//route handler for get product by id
exports.getProduct = catchAsync(async (req, res, next) => {

  const product = req.product;
  const imagePath = `${ path.dirname(__dirname) }/public/products/${ product.photo }`

  res.send(product);
})

//route handler for create product
exports.createProduct = catchAsync(async (req, res, next) => {
  const product = new Product(req.productData)
  await product.save()
  res.send(product);
})



