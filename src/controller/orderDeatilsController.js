const cartItemDeatilsservice = require("../service/cartItemDeatilsservice");
const { deleteCartItem } = require("./cartItemsController");


const createOrderDetails = async (req, res) => {
    try {

        const orderDetails = await cartItemDeatilsservice.createOrderDetails(req.body);
        res.status(201).json({ message: "Order details created successfully", orderDetails });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCartItemDetails = async (req, res) => {
    try {
        const cartItemDeatils = await cartItemDeatilsservice.getCartItemDetails(req.params.id);
        res.status(200).json({ message: "Cart item details fetched successfully", cartItemDeatils });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCartItemDeatils = async (req, res) => {
    try {
        const cartItemDeatils = await cartItemDeatilsservice.updateCartItemDeatils(req.params.id, req.body);
        res.status(200).json({ message: "Cart item details updated successfully", cartItemDeatils });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteCartItemDetails = async (req, res) => {
    try {
        const cartItemDeatils = await cartItemDeatilsservice.deleteCartItemDetails(req.params.id);
        res.status(200).json({ message: "Cart item details deleted successfully", cartItemDeatils });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { createOrderDetails, getCartItemDetails, updateCartItemDeatils, deleteCartItemDetails };
