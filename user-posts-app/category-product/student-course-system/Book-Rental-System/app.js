const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const bookRoutes = require("./routes/book.routes");
require("dotenv").config();

const app = express();
app.use(express.json());

connectDB();

app.use("/", userRoutes);
app.use("/", bookRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.listen(8005, () => console.log("Server Started"));
