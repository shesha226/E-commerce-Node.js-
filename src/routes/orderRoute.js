const orderController = require("../controller/orderController");
const express = require("express");
const router = express.Router();

const validate = require("../middleware/validate");
const { createOrderSchema } = require("../validators/schema");

router.post("/", validate(createOrderSchema), orderController.createOrder);
router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;