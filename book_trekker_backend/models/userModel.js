const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const config = require('config');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true, //any white spaces in beginning and end will be removed
    required: [ true, "Name is required" ],
    minlength: 5,
    maxlength: 32
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address' ]
  },
  hashed_password: {
    type: String,
    required: true
  },
  about: {
    type: String,
    trim: true
  },
  salt: Number, //Salt rounds generate long string which is used to create the hashed password
  role: {
    type: Number,//[0,1]
    default: 0 //0 for authenticated user and 1 is for admin
  },
  history: {
    type: Array,
    default: []
  }
},
  { timestamps: true }
);


userSchema.virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = config.get('saltRounds')
    this.encryptPassword(password);

  })
  .get(function () {
    return this._password
  })

userSchema.methods = {
  encryptPassword: function (password) {
    // if (typeof password !== String) return '';
    if (!password)
      return this.hashed_password = '';

    return this.hashed_password = bcrypt.hashSync(this._password, this.salt);

  },
  validatePassword: async function (user) {

    return await bcrypt.compare(user.password, this.hashed_password);

  }
  ,
  generateAuthToken: function () {
    const token = jwt.sign({ _id: this._id, email: this.email, role: this.role }, config.get('jwtPrivateKey'));
    return token;
  }
};

//signup validation
function validate(user) {
  const schema = Joi.object().keys({
    name: Joi.string().min(5).max(32).required(),
    email: Joi.string()
      .email().required(),
    password: Joi.string().min(5).max(255).required()
  });
  return schema.validate(user);
}



module.exports.User = mongoose.model('User', userSchema);
module.exports.validate = validate;





