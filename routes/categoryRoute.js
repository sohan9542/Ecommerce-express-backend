const express = require("express");
const {
  newCategory,

  getAllCategory,

  deleteCategory,
  updateCategory,
  getCategoryDetails,
} = require("../controllers/categoryController");
const router = express.Router();

const {
  isAuthenticatedUser
} = require("../middleware/auth");

router.route("/admin/category/new").post(isAuthenticatedUser, newCategory);

router
  .route("/category")
  .get(getAllCategory);

router
  .route("/admin/category/:id")
  .get(isAuthenticatedUser, getCategoryDetails)
  .put(isAuthenticatedUser, updateCategory)
  .delete(isAuthenticatedUser, deleteCategory);

module.exports = router;