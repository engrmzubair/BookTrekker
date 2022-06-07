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
  if (!config.get('braintree.merchantId')) {
    throw new Error('FATAL ERROR: marchantId is not defined.');
  }
  if (!config.get('braintree.publicKey')) {
    throw new Error('FATAL ERROR: brainTree_publicKey is not defined.');
  }
  if (!config.get('braintree.privateKey')) {
    throw new Error('FATAL ERROR: brainTree_privateKey is not defined.');
  }
  if (!process.env.NODE_ENV) {
    throw new Error('FATAL ERROR: environment is not defined.');
  }



}