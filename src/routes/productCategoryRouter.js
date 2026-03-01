const category = require("../controller/productCategoryController");
const express = require("express");
const router = express.Router();


const validate = require("../middleware/validate");
const protect = require("../middleware/protect");
const { categorySchema } = require("../validators/schema")

router.post("/", validate(categorySchema), category.createCategory);
router.get("/", protect, category.getAllCategory);
router.get("/:id", protect, category.getCategoryById);
router.put("/:id", protect, category.updatedCategogry);
router.delete("/:id", protect, category.deleteCategory);

module.exports = router;