const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }
  if (token) {
    const bearer = token.split(' ')
    const bearerToken = bearer[1]
    const decodedData = jwt.verify(bearerToken, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);
    next();
  }



});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};