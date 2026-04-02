const express = require("express")
const router = express.Router()

const { createPost } = require("../Controllers/postCreate")
const { getPosts } = require("../Controllers/posts")

router.post("/posts", createPost)
router.get("/posts", getPosts)
router.put("/posts/:id", require("../Controllers/posts").updatePost)
router.delete("/posts/:id", require("../Controllers/posts").deletePost)

module.exports = router