const express = require("express");
const router = express.Router();
const { addProductToWishlist, getCustomerWishlist, removeProductFromWishlist } = require("../controllers/wishlistController");


router.post("/add", addProductToWishlist);
router.get("/:customer_id", getCustomerWishlist);
router.delete("/remove", removeProductFromWishlist);
module.exports = router;
