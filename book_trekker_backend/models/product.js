const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const Joi = require('joi');

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
    minlength: 5,
    maxlength: 2000
  },
  price: {
    type: Number,
    required: [ true, "Please provide the price of the product." ],
  },
  category: {
    type: ObjectId,
    ref: "Category",
    required: [ true, "Please provide the category of the product." ]
  },
  quantity: {
    type: Number
  },
  photo: {
    type: Buffer,
    contentType: String
  },
  shipping: {
    type: Boolean
  }
},
  { timestamps: true }
);



//product validation
function validate(product) {
  const schema = Joi.object().keys({
    name: Joi.string().min(5).max(32).required(),
    email: Joi.string()
      .email().required(),
    password: Joi.string().min(5).max(255).required()
  });
  return schema.validate(product);
}



module.exports.product = mongoose.model('Product', productSchema);
module.exports.validate = validate;





