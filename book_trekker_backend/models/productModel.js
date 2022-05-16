const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true, //any white spaces in beginning and end will be removed
    required: [ true, "Please provide the name of the product." ],
    minlength: 5,
    maxlength: 32
  },
  description: {
    type: String,
    required: [ true, "Please provide the description of the product." ],
    minlength: 10,
    maxlength: 2000
  },
  price: {
    type: Number,
    required: [ true, "Please provide the price of the product." ],
  },
  quantity: {
    type: Number
  },
  sold: {
    type: Number,
    default: 0
  },
  category: {
    type: ObjectId,
    ref: "Category",
    required: [ true, "Please provide the category of the product." ]
  },
  photo: { type: String },
  shipping: {
    type: Boolean
  }
},
  { timestamps: true }
);

function validate(category) {
  const schema = Joi.object().keys({
    name: Joi.string().min(5).max(32).required(),
    description: Joi.string()
      .min(10).max(2000).required(),
    price: Joi.number().required(),
    quantity: Joi.number(),
    category: Joi.objectId().required(),
    photo: Joi.string(),
    shipping: Joi.boolean()
  });
  return schema.validate(category);
}


module.exports.Product = mongoose.model('Product', productSchema);
module.exports.validate = validate;





