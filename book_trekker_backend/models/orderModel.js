const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const config = require('config');
const { ObjectId } = mongoose.Schema;


const CartItemSchema = new mongoose.Schema({
  product: {
    type: ObjectId, ref: "Product"
  },
  name: String,
  price: Number,
  count: Number,

},
  { timestamps: false }
);

const CartItem = mongoose.model("CartItem", CartItemSchema);


const OrderSchema = new mongoose.Schema({
  products: [ CartItemSchema ],
  transaction_id: String,
  amount: Number,
  address: String,
  status: {
    type: String,
    default: "Not Processed",
    enum: [ "Not Processed", "Processing", "Shipped", "Delivered", "Cancelled" ]
  },
  updated: Date,
  user: { type: ObjectId, ref: "User" }

}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);


//validation of order
function validateOrder(order) {
  const schema = Joi.object().keys({
    products: Joi.array()
      .items({
        _id: Joi.objectId(),
        name: Joi.string(),
        price: Joi.number()
        ,
        count: Joi.number()
      }),
    transaction_id: Joi.string(),
    amount: Joi.number()
    ,
    address: Joi.string(),
    status: Joi.valid("Not Processed", "Processing", "Shipped", "Delivered", "Cancelled"),
    updated: Joi.date(),
    user: Joi.objectId(),

  });
  return schema.validate(order);
}





module.exports = { Order, CartItem };

