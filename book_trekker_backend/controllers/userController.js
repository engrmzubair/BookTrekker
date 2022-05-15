const { User } = require("../models/userModel");
const AppError = require("../utils/appError");


exports.userById = (req, res, next, id) => {

  User.findById(id).exec((err, user) => {

    if (!user || err) return next(new AppError("User is not registered!", 400));
    req.profile = user;
    next();
  });

};




