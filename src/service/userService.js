const { default: mongoose } = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const registerUser = async (userData) => {
    try {
        const { name, email, password, phone } = userData;


        if (!name || !email || !password || password.length < 6 || !phone) {
            throw new Error("All fields are required and password must be at least 6 characters long");
        }


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role: "user"
        });


        const userResponse = newUser.toObject();
        delete userResponse.password;

        return userResponse;

    } catch (error) {
        throw error;
    }
};

const logingUser = async (userData) => {
    const { email, password } = userData;
    if (!email || !password) {
        throw new Error("All fields are required");
    }

    const user = awaitUser.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });

    return { user, token };
}

const getAllUsers = async (queryData) => {
    const page = parseInt(queryData.page) || 1;
    const limit = parseInt(queryData.limit) || 10;
    const searchText = queryData.search || "";

    const skip = (page - 1) * limit;

    const searchCriteria = {
        $or: [
            { name: { $regex: searchText, $options: "i" } },
            { email: { $regex: searchText, $options: "i" } }
        ]
    };
    const users = await User.find(searchCriteria)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const totalUsers = await User.countDocuments(searchCriteria);

    return {
        users,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page
    };
};

const getUserById = async (userId) => {

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid User Id");
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new Error("User not found");
    }

    return user;

}

const updateUser = async (userData, userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid User Id");
    }

    if (userData.password || userData.role) {
        throw new Error("Password and Role cannot be updated");
    }
    if (userData.email) {
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error("User already exists");
        }
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    user.name = userData.name || user.name;
    user.email = userData.email || user.email;
    user.phone = userData.phone || user.phone;
    user.address = userData.address || user.address;

    await user.save();

    return user;
}

const deleteUser = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid User Id");
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}

module.exports = { registerUser, getAllUsers, getUserById, updateUser, deleteUser, logingUser };