const express = require("express");
const router = express.Router();
const userAddressController = require("../controller/userAdressController");

// CREATE
router.post("/", userAddressController.createUserAddress);

// GET by ID
router.get("/:id", userAddressController.getUserAddress);

// UPDATE
router.put("/:id", userAddressController.updateUserAddress);

// DELETE
router.delete("/:id", userAddressController.deleteUserAddress);

module.exports = router;