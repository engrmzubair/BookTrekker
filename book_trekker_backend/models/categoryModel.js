const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true, //any white spaces in beginning and end will be removed
    required: [ true, "Name is required" ],
    minlength: 5,
    maxlength: 32,
    unique: true
  },
},
  { timestamps: true }
);



function validate(category) {
  const schema = Joi.object().keys({
    name: Joi.string().min(5).max(32).required(),
  });
  return schema.validate(category);
}


module.exports.Category = mongoose.model('Category', categorySchema);
module.exports.validate = validate;





