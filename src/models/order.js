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
    },
    shippingAddress: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    items: {
        type: Array,
        required: true,
    },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;