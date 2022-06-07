const AppError = require('../utils/appError');
const config = require('config');
const User = require('../models/userModel')
const braintree = require("braintree");
const catchAsync = require('../utils/catchAsync');

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  // Use your own credentials from the sandbox Control Panel here
  merchantId: config.get('braintree.merchantId'),
  publicKey: config.get('braintree.publicKey'),
  privateKey: config.get('braintree.privateKey'),
});

//generate token
exports.generateToken = catchAsync(async function (req, res) {
  const response = await gateway.clientToken.generate({})

  res.send(response)
}
);

//process payment
exports.processPayment = catchAsync(async function (req, res) {

  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.payment;

  //charge
  let newTransaction = await gateway.transaction.sale({
    amount: amountFromTheClient, paymentMethodNonce: nonceFromTheClient, options: {
      // This option requests the funds from the transaction once it has been
      // authorized successfully
      submitForSettlement: true,

    }
  })

  res.json(newTransaction)

  // try {
  //   // Use the payment method nonce here
  //   var nonceFromTheClient = req.body.paymentMethodNonce;
  //   // Create a new transaction for $10
  //   var newTransaction = gateway.transaction.sale(
  //     {
  //       amount: "10.00",
  //       paymentMethodNonce: nonceFromTheClient,
  //       options: {
  //         // This option requests the funds from the transaction once it has been
  //         // authorized successfully
  //         submitForSettlement: true,
  //       },
  //     },
  //     function (error, result) {
  //       if (result) {
  //         res.send(result);
  //       } else {
  //         res.status(500).send(error);
  //       }
  //     }
  //   );
  // } catch (err) {
  //   // Deal with an error
  //   console.log(err);
  //   res.send(err);
  // }
});



