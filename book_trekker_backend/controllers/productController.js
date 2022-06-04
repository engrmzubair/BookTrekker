const multer = require('multer');

//imports from other local directories
const catchAsync = require("../utils/catchAsync");
const { Product } = require('../models/productModel');
const AppError = require("../utils/appError");
const {
  multerOptions,
  validation,
  deleteImage,
  getPhoto
} = require('../Helper/product/productValidation');
const { User } = require('../models/userModel');

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

  res.send(categories);
})


//route handler for get product by id
exports.getProduct = (req, res) => res.send(req.product);

//route handler for create product
exports.createProduct = catchAsync(async (req, res) => {
  const product = new Product(req.productData)

  await product.save();

  const newProduct = await Product
    .findById(product._id)
    .populate('category', 'name _id')

  res.send(newProduct);
})

//route handler for update product
exports.updateProduct = catchAsync(async (req, res) => {
  const { photo } = req.product;

  const product = await Product.findOneAndUpdate(
    { _id: req.product._id },
    { $set: req.body },
    { new: true })


  //removing prev image
  deleteImage(photo.publicId)

  //send updated product to client
  res.json({ product })
})
//route handler for delete product
exports.deleteProduct = catchAsync(async (req, res) => {

  const product = req.product;
  await product.remove();

  //removing prev image
  deleteImage(product.photo.publicId)

  res.json({ product });
});


//route handler for getting products by search
exports.productsBySearch = catchAsync(async (req, res) => {

  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};


  for (let key in req.body.filters) {

    if (req.body.filters[ key ].length > 0) {
      if (key === 'price') {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[ key ] = {
          $gte: req.body.filters[ key ][ 0 ],
          $lte: req.body.filters[ key ][ 1 ]
        };
      } else {
        findArgs[ key ] = req.body.filters[ key ];
      }
    }
  }
  const data = await Product.find(findArgs)
    .populate('category', "name _id")
    .sort([ [ sortBy, order ] ])
    .skip(skip)
    .limit(limit)
    .exec();

  res.json({
    size: data.length,
    data
  });
});




