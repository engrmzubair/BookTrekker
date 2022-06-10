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
exports.getStatusValues = (req, res) => {

  res.json(Order.schema.path('status').enumValues)
}


exports.orderById = async (req, res, next, id) => {

  try {

    const order = await Order
      .findById(id)
      .exec()

    if (!order) return next(new AppError('Invalid order id!', 400))

    req.order = order
    next()
  } catch (error) {
    next(error)
  }

}

exports.updateOrderStatus = catchAsync(async (req, res, next) => {

  const updatedOrder = await Order.findOneAndUpdate({ _id: req.order._id }, { $set: { status: req.body.status } }, { new: true })

  res.send(updatedOrder)


})