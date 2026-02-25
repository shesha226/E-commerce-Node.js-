const mongoose = require("mongoose");

const userAddressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    zip: { type: String, required: true },
    country: { type: String, required: true },
}, { timestamps: true });

const UserAddress = mongoose.model("UserAddress", userAddressSchema);
module.exports = UserAddress;