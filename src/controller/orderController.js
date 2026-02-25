const orderService = require("../service/orderservice");

const createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.body);
        res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders(req.query);
        res.status(200).json({ message: "Orders fetched successfully", orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        res.status(200).json({ message: "Order fetched successfully", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateOrder = async (req, res) => {
    try {
        const order = await orderService.updateOrder(req.body, req.params.id);
        res.status(200).json({ message: "Order updated successfully", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteOrder = async (req, res) => {
    try {
        const order = await orderService.deleteOrder(req.params.id);
        res.status(200).json({ message: "Order deleted successfully", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder };