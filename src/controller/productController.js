const productService = require("../service/productService");

const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json({ message: "Product Created Successfully!", data: product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts(req.query);
        res.status(200).json({ message: "Products Fetched Successfully!", data: products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProductByTd = async (req, res) => {
    try {
        const product = await productService.getProductByTd(req.params.id);
        res.status(200).json({ message: "Product Fetched Successfully!", data: product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.body, req.params.id);
        res.status(200).json({ message: "Product Updated Successfully!", data: product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await productService.deleteProduct(req.params.id);
        res.status(200).json({ message: "Product Deleted Successfully!", data: product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createProduct, getAllProducts, getProductByTd, updateProduct, deleteProduct };