const userService = require("../service/userService");

const registerUser = async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json({
            success: true,
            message: "User Registered Successfully!",
            data: user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const logingUser = async (req, res) => {
    try {
        const result = await userService.logingUser(req.body);
        res.status(200).json({
            success: true,
            message: "User Logged In Successfully!",
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers(req.query);
        res.status(200).json({
            success: true,
            message: "Users Fetched Successfully!",
            data: users
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json({
            success: true,
            message: "User Fetched Successfully!",
            data: user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.body, req.params.id);
        res.status(200).json({
            success: true,
            message: "User Updated Successfully!",
            data: user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        res.status(200).json({
            success: true,
            message: "User Deleted Successfully!",
            data: user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { registerUser, getAllUsers, getUserById, updateUser, deleteUser, logingUser };