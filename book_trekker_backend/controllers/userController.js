const { User, validate, validateUpdateUser } = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const _ = require('lodash');


exports.userById = (req, res, next, id) => {

  User.findById(id).exec((err, user) => {

    if (!user || err) return next(new AppError("User is not registered!", 400));
    req.profile = user;
    next();
  });

};


// router handlers for reading, writing updating and deleting user

exports.getProfile = catchAsync(async (req, res, next) => {

  const user = await User.findById(req.auth._id);
  if (!user) return next(new AppError("Please signin!", 400));

  res.send(_.pick(user, [ "_id", "name", "email", "role", "history" ]))
})

exports.getUserById = catchAsync(async (req, res, next) => {

  const user = req.profile;

  res.send(_.pick(user, [ "_id", "name", "email", "role", "history" ]))
})
exports.updateUser = catchAsync(async (req, res, next) => {

  const user = req.profile;

  const { error } = validateUpdateUser(req.body)

  if (error) return next(new AppError(error, 400))

  const updatedUser = await User.findOneAndUpdate({ _id: user._id }, { $set: req.body }, { new: true })

  res.send(_.pick(updatedUser, [ "_id", "name", "email", "role", "history" ]))
})





