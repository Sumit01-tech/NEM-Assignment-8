const express = require("express");
const router = express.Router();
const { addCategory } = require("../controllers/category.controller");

router.post("/add-category", addCategory);

module.exports = router;
