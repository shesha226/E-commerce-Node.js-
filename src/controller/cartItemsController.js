const cartItemService = require("../service/cartItemsService");

const createcartItems = async (req, res) => {
    try {
        const cartItem = await cartItemService.addToCart(req.body);
        res.status(201).json({ message: "product Add to cart", cartItem })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getcartitem = async (req, res) => {
    try {
        const cartItemId = req.params.id; // _id
        const cartitem = await cartItemService.getcartItem(cartItemId);
        res.status(200).json({ message: "Item fetched", cartitem })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateCartItem = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;


        const cartItem = await cartItemService.updateCartItem(userId, productId, quantity);

        res.status(200).json({ message: "Cart Item Updated Successfully", cartItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCartItem = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        const cartItem = await cartItemService.deleteCartItem(cartItemId);
        res.status(201).json({ message: "Cart item delete successfully", cartItem })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { deleteCartItem, updateCartItem, getcartitem, createcartItems }