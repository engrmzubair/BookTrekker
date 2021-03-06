const _ = require('lodash')
var { expressjwt } = require("express-jwt");
const { User, validate }
	= require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const config = require('config');


// ................validators..................
exports.signupValidation = async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });
	if (user) return next(new AppError("User is already registered! Please signin.", 400))

	const { error } = validate(req.body)
	if (error) return next(new AppError(error.details[ 0 ].message, 400));
	next()
}


// .................handlers...................
exports.signup = catchAsync(async (req, res, next) => {

	const user = new User(req.body);
	await user.save()

	res.send(_.pick(user, [ '_id', 'name', 'email' ]));;

})

exports.signin = catchAsync(async (req, res, next) => {

	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (!user) return next(new AppError(`Invalid email or password.`, 400));

	const validPassword = await user.validatePassword(req.body);
	;
	if (!validPassword) return next(new AppError(`Invalid email or password.`, 400));

	const token = user.generateAuthToken();

	res
		.header("x-auth-token", token)
		.header("access-control-expose-headers", "x-auth-token")
		.send(_.pick(user, [ "_id", "name", "email", "role", "history" ]));


})

exports.signout = (req, res) => {
	res.send("Signed out successfully");
}

exports.requireSignin = expressjwt({
	secret: config.get('jwtPrivateKey'),
	userProperty: "auth",
	algorithms: [ "HS256" ]
});

exports.isAuth = (req, res, next) => {


	let user = req.profile && req.auth && req.profile._id == req.auth._id;
	if (!user) return next(new AppError("Invalid credentials!", 401));
	next()
}

exports.isAdmin = (req, res, next) => {

	if (req.profile && req.profile.role === 1)
		return next();

	next(new AppError("Admin resource! Access denied.", 403));
}
