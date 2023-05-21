const Category = require("../models/CategoryModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


exports.newCategory = catchAsyncErrors(async (req, res, next) => {
    const {
      title,
      subcategory,
    } = req.body;
  
    const category = await Category.create({
      title,
      subcategory,
    });
  
    res.status(201).json({
      success: true,
      category,
    });
  });
  

  exports.getAllCategory = catchAsyncErrors(async (req, res, next) => {
    const category = await Category.find();
  
    res.status(200).json({
      success: true,
      category,
    });
  });

  exports.getCategoryDetails = catchAsyncErrors(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
  
    if (!category) {
      return next(new ErrorHander("Category not found", 404));
    }
  
    res.status(200).json({
      success: true,
      category,
    });
  });
  

  exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
    let category = await Category.findById(req.params.id);
  
    if (!category) {
      return next(new ErrorHander("Category not found", 404));
    }

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      category,
    });
  });
  // delete Order -- Admin
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHander("Category not found with this Id", 404));
  }

  await category.remove();

  res.status(200).json({
    success: true,
  });
});