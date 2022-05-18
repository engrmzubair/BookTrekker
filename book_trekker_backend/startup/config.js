const config = require('config');

//logging error if environment variables not set
module.exports = () => {
  console.log("Environment =>", process.env.NODE_ENV)

  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
  }
  if (!config.get('cloudinary.cloudName')) {
    throw new Error('FATAL ERROR: cloudName is not defined.');
  }
  if (!config.get('cloudinary.apiKey')) {
    throw new Error('FATAL ERROR: apiKey is not defined.');
  }
  if (!config.get('cloudinary.apiSecret')) {
    throw new Error('FATAL ERROR: apiSecret is not defined.');
  }
  if (!process.env.NODE_ENV) {
    throw new Error('FATAL ERROR: environment is not defined.');
  }



}