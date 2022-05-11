const _ = require('lodash')
var { expressjwt } = require("express-jwt");
const { User, validate }
	= require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');
const config = require('config');


// ................validators..................

exports.signupValidation = (req, res, next) => {

	const { error } = validate(req.body)
	if (error) return next(new appError(error.details[ 0 ].message, 400));
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

exports.signout = (req, res) => {
	res.clearCookie("t");
	res.send("Signed out successfully");
}

exports.requireSignin = expressjwt({
	secret: config.get('jwtPrivateKey'),
	userProperty: "auth",
	algorithms: [ "HS256" ]
});

