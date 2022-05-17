const multer = require('multer');
const fs = require('fs');

//imports from other local directories
const catchAsync = require("../utils/catchAsync");
const { Product } = require('../models/productModel');
const AppError = require("../utils/appError");
const path = require('path');
const {
  multerOptions,
  validation
} = require('../Helper/product/productValidation');


//image path directory declaration
const imageDir = `${ path.dirname(__dirname) }/public/products`;

//product validation from client side
exports.productValidation = async (req, res, next) => {

  if (!req.file) next(new AppError('Please attach the product image!', 400));

  //fields validation
  validation(req, next);

}

//multer middleware for parsing multipart form data
exports.uploadProductPhoto = multer(multerOptions).single('photo');

//pre middleware for getting product and set in req object
exports.productById = (req, res, next, _id) => {

  //find product => if found assign it to req object
  Product.findOne({ _id })
    .populate({
      path: 'category', select: 'name'
    })
    .exec((err, product) => {

      if (!product || err) return next(new AppError('Invalid product id!', 400))
      req.product = product;
      req.photo = product.photo;
      next();
    })
};

//route handler for getting all products
exports.getProducts = catchAsync(async (req, res, next) => {

  //extract params from query and declaration
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? req.query.limit : 6


  //Now fetched products from database
  const products = await Product.find()
    .populate({
      path: 'category',
      select: "name"
    })
    .sort([ [ sortBy, order ] ])
    .limit(limit)
    .exec()

  res.send(products)
})

//route handler for getting related products
exports.getRelatedProducts = catchAsync(async (req, res) => {
  let limit = req.query.limit ? req.query.limit : 6;
  next
  const products = await Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .limit(limit)
    .populate('category', 'name')
    .exec()

  res.send(products);
})

//route handler for getting categories
exports.getProductCategories = catchAsync(async (req, res) => {
  const categories = await Product.distinct('category')
    .exec();
  res.send(categories)
})

//route handler for get product by id
exports.getProduct = (req, res) => res.send(req.product);

//route handler for create product
exports.createProduct = catchAsync(async (req, res) => {
  const product = new Product(req.productData)
  await product.save()
  res.send(product);
})

//route handler for update product
exports.updateProduct = catchAsync(async (req, res) => {
  const product = req.product;
  const updatedProduct = req.productData;

  //updating the product
  product.name = updatedProduct.name;
  product.description = updatedProduct.description;
  product.price = updatedProduct.price;
  product.category = updatedProduct.category;
  product.photo = updatedProduct.photo;

  //update product in data base
  await product.save();

  //image path
  const imagePath = `${ imageDir }/${ req.photo }`;

  //removing prev image
  fs.existsSync(imagePath) && fs.unlinkSync(imagePath);

  //send updated product to client
  res.json({ product })
})
//route handler for delete product
exports.deleteProduct = catchAsync(async (req, res) => {

  const product = req.product;
  await product.remove();

  const imagePath = `${ imageDir }/${ product.photo }`;

  //removing prev image
  fs.existsSync(imagePath) && fs.unlinkSync(imagePath);

  res.json({ product });
})




