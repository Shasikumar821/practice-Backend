const express = require("express")
const router = express.Router()

const { createPost } = require("../Controllers/postCreate")
const { getPosts } = require("../Controllers/posts")

router.post("/posts", createPost)
router.get("/posts", getPosts)

module.exports = router