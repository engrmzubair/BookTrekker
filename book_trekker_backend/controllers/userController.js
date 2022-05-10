const { User, validateUser } = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');
const _ = require('lodash')

exports.getUsers = catchAsync(async (req, res) => {
  const user = await User.find().select('-hashed_password');

  res.send(user)
})


exports.userValidation = (req, res, next) => {
  const { error } = validateUser(req.body)
  if (error) return next(new appError(error.details[ 0 ].message, 400));
  next()
}

exports.signup = catchAsync(async (req, res, next) => {

  const { error } = validateUser(req.body)
  if (error) return next(new appError(error.details[ 0 ].message, 400));

  const user = new User(req.body);
  await user.save()

  res.send(_.pick(user, [ '_id', 'name', 'email' ]));;

})