const mongoose = require('mongoose');
const config = require('config');


//db
module.exports = () => {
  mongoose.connect(config.get('db'))
    .then(() => console.log('You are now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong.', err));
}