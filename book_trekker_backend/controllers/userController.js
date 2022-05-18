const { User } = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


exports.userById = (req, res, next, id) => {

  User.findById(id).exec((err, user) => {

    if (!user || err) return next(new AppError("User is not registered!", 400));
    req.profile = user;
    next();
  });

};

// router handlers for reading, writing updating and deleting user
exports.getUser = (req, res, next) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  res.json(req.profile)
}





