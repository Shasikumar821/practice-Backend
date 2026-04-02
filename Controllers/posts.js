const express = require("express")
const router = express.Router()
const Post = require("../models/postModel")

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find({ author: req.user.id }).populate("author", "email name");
        if(!posts){
            return res.status(404).json({ error: "No posts found for this user" });
        }
        res.json({ posts });
    }catch (err){
        res.status(500).json({ error: "Server Error"});
    }
}

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findOneAndUpdate({ _id: req.params.id, author: req.user.id }, req.body, { new : true });
        if(!post){
            return res.status(404).json({ error: "Post not found or you are not the author" });
        }
        res.json({ post });
    }catch (err) {
        res.status(500).json({ error: "Server Error"});
    }
}

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({ _id: req.params.id, author: req.user.id }, req.body, { new : true });
        if(!post){
            return res.status(404).json({ error: "Post not found or you are not the author" });
        }
        res.json({ message: "Post deleted successfully" });
    }catch (err) {
        res.status(500).json({ error: "Server Error"});
    }
}