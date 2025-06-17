const Product = require("../models/product.model");

exports.addProduct = async (req, res) => {
    try {
        const { name, price, category } = req.body;
        const product = new Product({ name, price, category });
        await product.save();
        res.status(201).json({ message: "Product added", product });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("category", "name");
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
