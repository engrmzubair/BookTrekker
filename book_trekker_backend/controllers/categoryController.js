const catchAsync = require("../utils/catchAsync");
const { Category, validate } = require('../models/categoryModel');
const AppError = require("../utils/appError");

// ..........validation............
exports.categoryValidation = (req, res, next) => {

  const { error } = validate(req.body);
  if (error) next(new AppError(error.details[ 0 ].message, 400))
  next()
}


//route handlers
exports.createCategory = catchAsync(async (req, res, next) => {

  const category = new Category(req.body);

  const savedCategory = await category.save();

  res.json({ savedCategory });
})

// 