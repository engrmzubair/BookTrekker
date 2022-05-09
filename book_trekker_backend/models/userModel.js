const mongoose = require('mongoose');
const crypto = require('crypto');


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
  salt: String,//long string which is used to generate the harsh password
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
)


