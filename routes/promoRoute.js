const express = require("express");
const {
    newPromo,
    getAllPromo,
    deletePromo,
    verifyPromo,
} = require("../controllers/PromoController");
const router = express.Router();

const {
    isAuthenticatedUser
} = require("../middleware/auth");

router.route("/admin/promo/new").post(isAuthenticatedUser, newPromo);

router
    .route("/promo")
    .get(getAllPromo);


router
    .route("/promo/verify")
    .post(verifyPromo);

router
    .route("/admin/promo/:id")
    .delete(isAuthenticatedUser, deletePromo);

module.exports = router;