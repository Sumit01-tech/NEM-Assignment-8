const Post = require("../models/post.model");
const User = require("../models/user.model");

exports.addPost = async (req, res) => {
    try {
        const { title, content, author } = req.body;

        // Check if author exists
        const userExists = await User.findById(author);
        if (!userExists) {
            return res.status(404).json({ error: "Author not found" });
        }

        const newPost = new Post({ title, content, author });
        await newPost.save();

        res.status(201).json({ message: "Post added successfully", post: newPost });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "name email");
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
