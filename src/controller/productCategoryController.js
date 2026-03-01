const productCategoryService = require("../service/productCategoryservice");

const createCategory = async (req, res) => {
    try {
        const category = await productCategoryService.createProductCategory(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllCategory = async (req, res) => {
    try {
        const category = await productCategoryService.getAllCategory(req.query);
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await productCategoryService.getCategoryById(req.params.id);
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatedCategogry = async (req, res) => {
    try {
        const category = await productCategoryService.updatedCategory(req.params.id, req.body);
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await productCategoryService.deleteCategory(req.params.id);
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createCategory,
    getAllCategory,
    getCategoryById,
    updatedCategogry,
    deleteCategory
};