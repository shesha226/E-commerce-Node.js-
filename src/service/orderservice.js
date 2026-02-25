const { default: mongoose } = require("mongoose");
const Order = require("../models/order");

const createOrder = async (orderData) => {
    try {
        const { userId, items, totalAmount, shippingAddress, paymentMethod } = orderData;
        if (!userId || !items || !totalAmount || !shippingAddress || !paymentMethod) {
            throw new Error("All fields are required");
        }


        const existingOrder = await Order.findOne({ userId });
        if (existingOrder) {
            throw new Error("Order already exists");
        }

        const order = await Order.create({
            userId,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod
        });
        return order;
    } catch (error) {
        throw error;
    }
}

const getAllOrders = async (queryData) => {
    try {
        const page = parseInt(queryData.page) || 1;
        const limit = parseInt(queryData.limit) || 10;
        const searchText = queryData.search || "";
        const skip = (page - 1) * limit;

        let searchCriteria = {};

        if (searchText) {
            const regex = { $regex: searchText, $options: "i" };

            const orConditions = [
                { shippingAddress: regex },
                { paymentMethod: regex }
            ];

            if (!isNaN(searchText)) {
                orConditions.push({ totalAmount: Number(searchText) });
            }

            searchCriteria = { $or: orConditions };
        }

        const orders = await Order.find(searchCriteria)
            // මෙන්න මෙතන "shippingAddress" තියෙනවද බලන්න 👇
            .select("shippingAddress totalAmount status items paymentMethod")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        const totalOrder = await Order.countDocuments(searchCriteria);

        return {
            orders,
            totalOrder,
            totalPages: Math.ceil(totalOrder / limit),
            currentPage: page
        };
    } catch (error) {
        throw error;
    }
}

const getOrderById = async (orderId) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            throw new Error("Invalid Order Id");
        }
        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error("Order not found");
        }
        return order;
    } catch (error) {
        throw error;
    }
}

const updateOrder = async (orderData, orderId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            throw new Error("Invalid Order Id");
        }

        const existingOrder = await Order.findById(orderId);

        if (!existingOrder) {
            throw new Error("Order not found");
        }


        existingOrder.status = orderData.status ?? existingOrder.status;
        existingOrder.paymentStatus = orderData.paymentStatus ?? existingOrder.paymentStatus;
        existingOrder.shippingAddress = orderData.shippingAddress ?? existingOrder.shippingAddress;
        existingOrder.paymentMethod = orderData.paymentMethod ?? existingOrder.paymentMethod;
        existingOrder.items = orderData.items ?? existingOrder.items;
        existingOrder.totalAmount = orderData.totalAmount ?? existingOrder.totalAmount;



        await existingOrder.save();

        await existingOrder.populate('userId', 'address name email');

        return existingOrder;

    } catch (error) {
        throw error;
    }
}

const deleteOrder = async (orderId) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            throw new Error("Invalid Order Id");
        }
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            throw new Error("Order not found");
        }
        return order;
    } catch (error) {
        throw error;
    }
}

module.exports = { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder };