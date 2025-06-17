const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

const app = express();
app.use(express.json());

connectDB();

app.use("/", userRoutes);
app.use("/", postRoutes);

app.listen(8001, () => {
    console.log("Server Started");
});
