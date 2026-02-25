const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    image: { type: String },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductCategory",
    },

}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;