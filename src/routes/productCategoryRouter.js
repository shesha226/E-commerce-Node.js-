const category = require("../controller/productCategoryController");
const express = require("express");
const router = express.Router();

router.post("/", category.createCategory);
router.get("/", category.getAllCategory);
router.get("/:id", category.getCategoryById);
router.put("/:id", category.updatedCategogry);
router.delete("/:id", category.deleteCategory);

module.exports = router;