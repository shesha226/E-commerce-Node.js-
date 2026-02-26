const express = require("express")
const router = express.Router()
const cartItemController = require("../controller/cartItemsController")


router.post("/", cartItemController.createcartItems);
router.get("/:id", cartItemController.getcartitem);
router.put('/:id', cartItemController.updateCartItem);
router.delete("/:cartItemId", cartItemController.deleteCartItem)

module.exports = router