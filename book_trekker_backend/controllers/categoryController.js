const catchAsync = require("../utils/catchAsync");
const { Category, validate } = require('../models/categoryModel');
const AppError = require("../utils/appError");
const _ = require('lodash');

// ..........validation............
exports.categoryValidation = async (req, res, next) => {

  const { error } = validate(req.body);
  if (error) return next(new AppError(error.details[ 0 ].message, 400))

  const categoryName = req.body.name.toUpperCase();

  try {
    const category = await Category.findOne({ name: req.body.name })

    if (category) return next(new AppError('Category already exist!', 400))
  } catch (ex) {
    next(ex)
  }


  next()
}


//pre middleware for getting category and set in req object
exports.categoryById = (req, res, next, _id) => {

  //find category => if found assign it to req object
  Category.findOne({ _id }).exec((err, category) => {

    // res.send(category)
    if (!category || err) return next(new AppError('Invalid category id!', 400))

    req.category = category;
    next();
  })
};

//route handler for getting all products
exports.getCategories = catchAsync(async (req, res, next) => {
  const categories = await Category
    .find()
    .select('_id name')
  res.send(categories)
});

//route handler for get category by id
exports.getCategory = (req, res, next) => res.send(req.category);


//route handler for create category
exports.createCategory = catchAsync(async (req, res, next) => {
  const category = new Category(req.body)
  await category.save()

  res.send(_.pick(category, [ "_id", "name" ]));
})

//route handler for update category
exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = req.category;
  category.name = req.body.name;
  await category.save();
  res.send({ category })
})
//route handler for delete category
exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = req.category;
  await category.remove();
  res.send(category);

  res.send('Category deleted successfully!')
})
