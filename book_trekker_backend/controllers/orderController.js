const { Order, CartItem } = require("../models/orderModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


exports.createOrder = catchAsync(async (req, res) => {


  req.body.user = req.profile._id;

  const order = new Order(req.body);
  const data = await order.save();

  res.json(data);
})

exports.getOrders = catchAsync(async (req, res) => {

  const orders = await Order
    .find()
    .populate('user', "name email")
    .sort('-createdAt')
    .exec()

  res.json(orders)
})