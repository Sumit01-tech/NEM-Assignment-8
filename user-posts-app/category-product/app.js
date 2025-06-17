const express = require("express");
const mongoose = require("mongoose");
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/categoryProductDB")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection failed:", err));

app.use("/", categoryRoutes);
app.use("/", productRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "This route is undefined from index.js" });
});

app.listen(8002, () => {
    console.log("Server Started")
});
