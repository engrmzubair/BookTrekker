const { Order, CartItem } = require("../models/orderModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


exports.createOrder = catchAsync(async (req, res) => {


  req.body.user = req.profile._id

  const order = new Order(req.body);
  const data = await order.save();

  res.json(data);
})

exports.sayHello = (req, res) => res.send("hello")