const OrderDeatails = require("../models/orderDeatails");
const Product = require("../models/product");


const createOrderDetails = async ({ orderId, productId, quantity }) => {

    if (!orderId || !productId || !quantity) {
        throw new Error("All fields are required");
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }

    if (product.stock < quantity) {
        throw new Error(`Not enough stock. Only ${product.stock} available`);
    }

    const totalPrice = product.price * quantity;

    const newOrderDetail = await OrderDetails.create({
        orderId,
        productId,
        quantity,
        totalPrice
    });


    await Product.findByIdAndUpdate(
        productId,
        { $inc: { stock: -quantity } },
        { returnDocument: "after" }
    );

    return newOrderDetail;
};


const getCartItemDetails = async ({ cartItemDetailId }) => {

    if (!cartItemDetailId) {
        throw new Error("Cart Item ID is required");
    }

    const cartItem = await CartItem.findById(cartItemDetailId)
        .populate("productId");

    if (!cartItem) {
        throw new Error("Cart Item not found");
    }

    const totalPrice = cartItem.productId?.price
        ? cartItem.productId.price * cartItem.quantity
        : 0;

    return {
        cartItem,
        totalPrice
    };
};


module.exports = { getCartItemDetails, createOrderDetails };

