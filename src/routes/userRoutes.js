const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

const validate = require("../middleware/validate");
const protect = require("../middleware/protect");
const { userRegisterSchema, userLoginSchema } = require("../validators/schema");

router.post("/register", validate(userRegisterSchema), userController.registerUser);
router.post("/login", validate(userLoginSchema), userController.logingUser);
router.get("/", protect, userController.getAllUsers);
router.get("/:id", protect, userController.getUserById);
router.put("/:id", protect, userController.updateUser);
router.delete("/:id", protect, userController.deleteUser);

module.exports = router;