const mongoose = require("mongoose");
require("dotenv").config();

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("DB connection error:", err.message);
    }
};
