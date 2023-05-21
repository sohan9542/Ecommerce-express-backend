const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


exports.processPayment = catchAsyncErrors(async (req, res, next) => {

  // const myPayment = await stripe.paymentIntents.create({
  //   amount: req.body.amount,
  //   currency: "usd",
  //   metadata: {
  //     company: "Ecommerce",
  //   },
   
  // });

  const myPayment = await stripe.paymentIntents.create({
    amount: parseInt(req.body.amount),
    currency: 'gbp',
    automatic_payment_methods: {enabled: true},
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
