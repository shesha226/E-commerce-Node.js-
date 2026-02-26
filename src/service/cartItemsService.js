const CartItem = require("../models/cartItems");
const mongoose = require("mongoose");
const Product = require("../models/product");



const addToCart = async (cartItemData) => {
    try {
        const { userId, productId, quantity } = cartItemData;

        if (!userId || !productId || !quantity) {
            throw new Error("All fields are required");
        }


        const product = await Product.findById(productId);

        if (!product) {
            throw new Error("Product not found");
        }


        if (quantity > product.stock) {
            throw new Error(`Not enough stock! Only ${product.stock} available.`);
        }


        const existingCartItem = await CartItem.findOne({ userId, productId });
        if (existingCartItem) {
            throw new Error("Item already exists in cart");
        }

        const newCartItem = await CartItem.create({
            userId,
            productId,
            quantity
        });


        await Product.findByIdAndUpdate(productId, {
            $inc: { stock: -quantity }
        });

        return newCartItem;
    } catch (error) {
        throw error;
    }
}

const getcartItem = async (cartItemId) => {

    if (!cartItemId) {
        throw new Error("Cart Item ID is required");
    }

    const cartItem = await CartItem.findById(cartItemId)
        .populate("productId");

    if (!cartItem) {
        return { cartItems: [], totalBill: 0 };
    }

    const totalBill = cartItem.productId?.price
        ? cartItem.productId.price * cartItem.quantity
        : 0;

    return { cartItems: [cartItem], totalBill };
};


const updateCartItem = async (userId, productId, newQuantity) => {
    try {
        const existingItem = await CartItem.findOne({ userId, productId });

        if (!existingItem) {
            throw new Error("Item not found in cart");
        }

        const oldQuantity = existingItem.quantity;

        const difference = newQuantity - oldQuantity;

        if (difference > 0) {
            const product = await Product.findById(productId);
            if (!product || product.stock < difference) {
                throw new Error(`Not enough stock! Only ${product.stock} left.`);
            }
        }


        const updatedCartItem = await CartItem.findOneAndUpdate(
            { userId, productId },
            { quantity: newQuantity },
            { returnDocument: "after" }
        );


        await Product.findByIdAndUpdate(productId, {
            $inc: { stock: -difference }
        });

        return updatedCartItem;

    } catch (error) {
        throw error;
    }
}



const deleteCartItem = async (cartItemId) => {
    try {

        if (!cartItemId) {
            throw new Error("Cart Item ID is required");
        }


        const cartItem = await CartItem.findByIdAndDelete(cartItemId);

        if (!cartItem) {
            throw new Error("Item not found in cart");
        }


        await Product.findByIdAndUpdate(
            cartItem.productId,
            { $inc: { stock: cartItem.quantity } },
            { returnDocument: "after" }
        );

        return cartItem;

    } catch (error) {
        throw error;
    }
};



module.exports = { addToCart, getcartItem, updateCartItem, deleteCartItem };
