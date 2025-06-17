const Category = require("../models/category.model");

exports.addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = new Category({ name, description });
        await category.save();
        res.status(201).json({ message: "Category added", category });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
