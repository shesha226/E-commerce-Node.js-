const express = require("express");
const router = express.Router();
const userAddressController = require("../controller/userAdressController");

const validate = require("../middleware/validate");
const protect = require("../middleware/protect");
const { userAddressSchema } = require("../validators/schema");


router.post("/", validate(userAddressSchema), protect, userAddressController.createUserAddress);

router.get("/:id", protect, userAddressController.getUserAddress);

router.put("/:id", protect, userAddressController.updateUserAddress);

router.delete("/:id", protect, userAddressController.deleteUserAddress);

module.exports = router;