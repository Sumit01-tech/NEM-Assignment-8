const User = require("../models/user.model");

exports.addUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;

        const newUser = new User({ name, email, age });
        await newUser.save();

        res.status(201).json({ message: "User added successfully", user: newUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
