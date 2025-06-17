const User = require("../models/user.model");
const Book = require("../models/book.model");

exports.addUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ message: "User created", user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getUserRentals = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate("rentedBooks", "title author genre");
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
