require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/book.routes");
const memberRoutes = require("./routes/member.routes");

const app = express();
app.use(express.json());
connectDB();

app.use("/", bookRoutes);
app.use("/", memberRoutes);

app.use((_, res) => res.status(404).json({ message: "Route not found" }));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
