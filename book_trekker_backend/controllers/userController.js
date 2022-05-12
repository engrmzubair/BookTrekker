const { User } = require("../models/userModel");
const AppError = require("../utils/appError");


exports.userById = async (req, res, next, id) => {

  User.findById(id).exec((err, user) => {

    if (!user || err) next(new AppError("User is not registered!"));
    req.profile = user;
    next();
  });

};




