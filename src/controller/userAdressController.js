const UserAddressService = require("../service/userAddressService");


const createUserAddress = async (req, res) => {
    try {
        const userAddress = await UserAddressService.createUserAddress(req.body);
        res.status(201).json({ message: "create User Address", userAddress })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};


const getUserAddress = async (req, res) => {
    try {
        const userId = req.params.id;
        const userAddresses = await UserAddressService.getUserAddressByUserId(userId);

        res.status(200).json({ message: "User Address fetch", userAddresses });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};


const updateUserAddress = async (req, res) => {
    try {
        const addressId = req.params.id;
        const updatedAddress = await UserAddressService.updateUserAddress(addressId, req.body);

        res.status(200).json({ message: "User Address updated", updatedAddress });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }


}


const deleteUserAddress = async (req, res) => {
    try {
        const userId = req.params.id;
        const userAddress = await UserAddressService.deleteUserAddress(userId);
        res.status(200).json({ message: "Delete Usser Address", userAddress })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createUserAddress, getUserAddress, updateUserAddress, deleteUserAddress }


