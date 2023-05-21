const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,

    shippingPrice,
    totalPrice,
    discount
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
    name: req.user.name,
    discount
  });

  orderItems.map(async (item)=>{
    let product = await Product.findById(item.product)
    product.stock = parseInt(product.stock) - parseInt(item.quantity)
    await Product.findByIdAndUpdate(item.product, product)
  })

  res.status(201).json({
    success: true,
    order,
  });
});

// get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user  Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({
    user: req.user._id
  });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
let totalItems = 0
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
    totalItems += order.orderItems.length
  });

  res.status(200).json({
    success: true,
    totalAmount,
    totalItems,
    orders,
  });
});

// update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  let order = await Order.findById(req.params.id);
  //  order = order.toObject()
  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }



  if (req.body.status) {
  
    order.orderStatus = req.body.status;

  }

  if (req.body.newNote) {
    order.note = req.body.newNote
  }
  // console.log(order)
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({
    validateBeforeSave: false
  });
  res.status(200).json({
    success: true,
    data: order
  });
});


// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});