const express = require("express");
const router = express.Router();
const { addUser } = require("../controllers/user.controller");

router.post("/add-user", addUser);

module.exports = router;
