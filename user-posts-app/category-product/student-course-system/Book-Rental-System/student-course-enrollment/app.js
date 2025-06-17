const express = require("express");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/student.routes");
const courseRoutes = require("./routes/course.routes");

require("dotenv").config();

const app = express();
app.use(express.json());

connectDB();

app.use("/", studentRoutes);
app.use("/", courseRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.listen(8006, () => console.log("Server Started"));
