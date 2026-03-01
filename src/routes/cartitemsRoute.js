const express = require("express")
const router = express.Router()
const cartItemController = require("../controller/cartItemsController")

const validate = require("../middleware/validate");
const protect = require("../middleware/protect");
const { cartItemSchema } = require("../validators/schema");


router.post("/", protect, validate(cartItemSchema), cartItemController.createcartItems);
router.get("/:id", protect, cartItemController.getcartitem);
router.put('/:id', protect, validate(cartItemSchema), cartItemController.updateCartItem);
router.delete("/:cartItemId", protect, cartItemController.deleteCartItem)

module.exports = router