const mongoose = require("mongoose");

const userPaymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    paymentMethod: { type: String, required: true },
    provider: { type: String },
    accountNo: { type: String }
}, { timestamps: true });

const UserPayment = mongoose.model("UserPayment", userPaymentSchema);
module.exports = UserPayment;