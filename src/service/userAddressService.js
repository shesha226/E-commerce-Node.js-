const { default: mongoose } = require("mongoose");
const UserAddress = require("../models/userAddress");

const createUserAddress = async (userAddressData) => {
    try {
        const { userId, address, city, state, pincode, country } = userAddressData;

        if (!userId || !address || !city || !state || !pincode || !country) {
            throw new Error("All fields are required");
        }
        const existingUserAddress = await UserAddress.findOne({ userId, address });
        if (existingUserAddress) {
            throw new Error("User Address already exists");
        }
        const userAddress = await UserAddress.create(userAddressData);
        return userAddress;
    }
    catch (error) {
        throw error;
    }
}


const getUserAddressById = async (userId) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid User Id");
        }
        const userAddress = await UserAddress.findById(userId);
        return userAddress;
    }
    catch (error) {
        throw error;
    }
}

const updateUserAddress = async (userId, userAddressData) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid User Id");
        }
        const userAddress = await UserAddress.findByIdAndUpdate(userId, userAddressData, { new: true });

        if (!userAddress) {
            throw new Error("User Address not found");
        }
        userAddress.address = userAddressData.address || userAddress.address;
        userAddress.city = userAddressData.city || userAddress.city;
        userAddress.state = userAddressData.state || userAddress.state;
        userAddress.pincode = userAddressData.pincode || userAddress.pincode;
        userAddress.country = userAddressData.country || userAddress.country;
        await userAddress.save();
        return userAddress;
    }
    catch (error) {
        throw error;
    }


}

const deleteUserAddress = async (userId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid User Id");
        }
        const userAddress = await UserAddress.findByIdAndDelete(userId);
        return userAddress;
    }
    catch (error) {
        throw error;
    }
}


module.exports = { createUserAddress, getUserAddressById, updateUserAddress, deleteUserAddress };