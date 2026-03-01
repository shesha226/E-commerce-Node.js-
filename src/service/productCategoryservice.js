const { default: mongoose } = require("mongoose");
const ProductCategory = require("../models/productCategory");


const createProductCategory = async (categoryData) => {
    const { name, description } = categoryData;
    if (!name || !description) throw new Error("All fields are required");

    const existingCategory = await ProductCategory.findOne({ name });
    if (existingCategory) throw new Error("Category already exists");

    return await ProductCategory.create(categoryData);
};

const getAllCategory = async (queryData) => {
    const page = parseInt(queryData.page) || 1;
    const limit = parseInt(queryData.limit) || 10;
    const searchText = queryData.search || "";

    const skip = (page - 1) * limit;

    const searchCriteria = {
        name: { $regex: searchText, $options: "i" }
    };

    const categories = await ProductCategory.find(searchCriteria)
        .skip(skip)
        .limit(limit);

    const totalCategory = await ProductCategory.countDocuments(searchCriteria);

    return {
        categories,
        totalCategory,
        page,
        totalPages: Math.ceil(totalCategory / limit)
    };
};




const getCategoryById = async (categoryId) => {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) throw new Error("Invalid Category ID");

    const category = await ProductCategory.findById(categoryId);
    if (!category) throw new Error("Category not found");

    return category;
};


const updatedCategory = async (categoryId, categoryData) => {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) throw new Error("Invalid Category ID");

    const category = await ProductCategory.findById(categoryId);
    if (!category) throw new Error("Category not found");

    if (categoryData.name) {
        const existingCategory = await ProductCategory.findOne({ name: categoryData.name });
        if (existingCategory && existingCategory._id.toString() !== categoryId) {
            throw new Error("Category already exists");
        }
    }

    category.name = categoryData.name || category.name;
    category.description = categoryData.description || category.description;

    await category.save();
    return category;
};

const deleteCategory = async (categoryId) => {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) throw new Error("Invalid Category ID");

    const category = await ProductCategory.findByIdAndDelete(categoryId);
    if (!category) throw new Error("Category not found");

    return category;
};

module.exports = {
    createProductCategory,
    getAllCategory,
    getCategoryById,
    updatedCategory,
    deleteCategory
};