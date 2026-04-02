const express = require("express")
const router = express.Router()
const Post = require("../models/postModel")

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find({ author: req.user.email });
        if(!posts){
            return res.status(404).json({ error: "No posts found for this user" });
        }
        res.json({ posts });
    }catch (err){
        res.status(500).json({ error: "Server Error"});
    }
}