const Promo = require("../models/PromoModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


exports.newPromo = catchAsyncErrors(async (req, res, next) => {
  const {
    title,
    discount,
    deadline
  } = req.body;

  const category = await Promo.create({
    title,
    discount,
    deadline
  });

  res.status(201).json({
    success: true,
    category,
  });
});


exports.verifyPromo = catchAsyncErrors(async (req, res, next) => {
  const allpromo = await Promo.find();
  let promoTitle = req.body.promoTitle
  let promo = allpromo.filter((item) => item.title === promoTitle)
  if (promo.length === 0) {
    return next(new ErrorHander("Coupon not found", 404));
  }
  let valid
  if(promo){
    let date1 = new Date(promo[0].deadline).getTime();
    let date2 = new Date().getTime();
    if(date1 < date2){
      valid = false
    }
   else{
    valid = true
   }
  }
  res.status(200).json({
    success: true,
    valid,
    promo: promo[0]
  });
});


exports.getAllPromo = catchAsyncErrors(async (req, res, next) => {
  const category = await Promo.find();

  res.status(200).json({
    success: true,
    category,
  });
});

// delete Order -- Admin
exports.deletePromo = catchAsyncErrors(async (req, res, next) => {
  const promo = await Promo.findById(req.params.id);

  if (!promo) {
    return next(new ErrorHander("Promo not found with this Id", 404));
  }

  await promo.remove();

  res.status(200).json({
    success: true,
  });
});