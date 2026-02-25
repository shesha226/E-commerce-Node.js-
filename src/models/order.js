const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending",
    },
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserPayment"
    }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;