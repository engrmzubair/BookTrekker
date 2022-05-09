const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('config');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true, //any white spaces in beginning and end will be removed
    required: [ true, "Name is required" ],
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
    this.hashed_password = this.encryptPassword(password);

  })
  .get(function () {
    return this._password
  })

userSchema.methods = {
  encryptPassword: async function (password) {
    // if (typeof password !== String) return '';
    if (!password && typeof password !== String)
      return this.hashed_password = '';

    return bcrypt.hashSync(this._password, this.salt);

  }
}

module.exports = mongoose.model('User', userSchema);







