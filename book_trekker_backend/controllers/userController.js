const { User } = require("../models/userModel");
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





