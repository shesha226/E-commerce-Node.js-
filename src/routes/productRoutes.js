const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

const validate = require("../middleware/validate");
const protect = require("../middleware/protect");
const { productSchema } = require("../validators/schema")

router.post("/", protect, validate(productSchema), productController.createProduct);
router.get("/", protect, productController.getAllProducts);
router.get("/:id", protect, productController.getProductByTd);
router.put("/:id", protect, productController.updateProduct);
router.delete("/:id", protect, productController.deleteProduct);

module.exports = router;