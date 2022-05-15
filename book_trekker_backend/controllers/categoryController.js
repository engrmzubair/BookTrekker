const catchAsync = require("../utils/catchAsync");
const { Category, validate } = require('../models/categoryModel');
const AppError = require("../utils/appError");

// ..........validation............
exports.categoryValidation = (req, res, next) => {

  const { error } = validate(req.body);
  if (error) next(new AppError(error.details[ 0 ].message, 400))
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
exports.getCategories = catchAsync(async (req, res, next) => res.send(await Category.find()));

//route handler for get category by id
exports.getCategory = (req, res, next) => res.send(req.category);


//route handler for create category
exports.createCategory = catchAsync(async (req, res, next) => {
  const category = new Category(req.body)
  await category.save()
  res.send(category);
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
