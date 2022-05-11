const _ = require('lodash')
// const jwt = require('jsonwebtoken'); //to generate signed token
var { expressjwt } = require("express-jwt");
const { User, validateSignup }
	= require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');
const config = require('config');


// ................validators..................

exports.signupValidation = (req, res, next) => {

	const { error } = validateSignup(req.body)
	if (error) return next(new appError(error.details[ 0 ].message, 400));
	next()
}


// .................handlers...................

exports.getUsers = catchAsync(async (req, res) => {
	const user = await User.find().select('-hashed_password');
	res.send(user)
})

exports.signup = catchAsync(async (req, res, next) => {

	const user = new User(req.body);
	await user.save()

	res.send(_.pick(user, [ '_id', 'name', 'email' ]));;

})

exports.signin = catchAsync(async (req, res, next) => {

	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (!user) return next(new appError(`Invalid email or password.`, 400));

	const validPassword = await user.validatePassword(req.body);
	;
	if (!validPassword) return next(new appError(`Invalid email or password.`, 400));

	const token = user.generateAuthToken();

	res.cookie("authToken", token, { expire: new Date() + 9999 });
	// res.cookie("authToken", token, { expires: new Date(Date.now() + 10000) });

	res.json({
		user: _.pick(user, [ '_id', 'name', 'email' ]),
		token
	});

})



