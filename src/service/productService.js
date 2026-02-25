const { default: mongoose } = require("mongoose");
const Product = require("../models/product");


const createProduct = async (productData) => {
    const { name, description, price, category, stock, images } = productData;

    if (!name || !description || !price || !category || !stock || !images) {
        throw new Error("All fields are required");
    }
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
        throw new Error("Product already exists");
    }

    const product = await Product.create(productData);
    return product;

}

const getAllProducts = async (queryData) => {

    const page = parseInt(queryData.page) || 1;
    const limit = parseInt(queryData.limit) || 10;
    const searchText = queryData.search || "";
    const skip = (page - 1) * limit;

    const searchCriteria = {
        $or: [
            { name: { $regex: searchText, $options: "i" } },
            { description: { $regex: searchText, $options: "i" } }
        ]
    };

    const products = await Product.find(searchCriteria)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const totalProducts = await Product.countDocuments(searchCriteria);

    return {
        products,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page
    };

}

const getProductByTd = async (productId) => {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new Error("Invalid Product Id");
    }
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
}


const updateProduct = async (productData, productId) => {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new Error("Invalid Product Id");
    }

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
        throw new Error("Product not found");
    }

    if (productData.name) {
        const existingProduct = await Product.findOne({ name: productData.name });
        if (existingProduct) {
            throw new Error("Product already exists");
        }
    }

    existingProduct.name = productData.name || existingProduct.name;
    existingProduct.description = productData.description || existingProduct.description;
    existingProduct.price = productData.price || existingProduct.price;
    existingProduct.category = productData.category || existingProduct.category;
    existingProduct.stock = productData.stock || existingProduct.stock;
    existingProduct.images = productData.images || existingProduct.images;

    await existingProduct.save();
    return existingProduct;


}

const deleteProduct = async (productId) => {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new Error("Invalid Product Id");
    }
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
}

module.exports = { createProduct, getAllProducts, getProductByTd, updateProduct, deleteProduct };

