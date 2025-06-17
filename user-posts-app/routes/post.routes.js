const express = require("express");
const router = express.Router();
const { addPost, getAllPosts } = require("../controllers/post.controller");

router.post("/add-post", addPost);
router.get("/posts", getAllPosts);

module.exports = router;
