const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getUsers = (req, res) => {

  res.send('An array of all users.')
}


exports.signup = catchAsync(async (req, res, next) => {



  res.send("user registered");


})