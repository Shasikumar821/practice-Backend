const express = require("express")
const router = express.Router()

const { createPost } = require("../Controllers/postCreate")
const { getPosts } = require("../Controllers/posts")
const { getProfile, UpdateProfile, deleteProfile } = require("../Controllers/profile")

router.post("/posts", createPost)
router.get("/posts", getPosts)
router.put("/posts/:id", require("../Controllers/posts").updatePost)
router.delete("/posts/:id", require("../Controllers/posts").deletePost)
router.get("/profile" , getProfile)
router.put("/profile" , UpdateProfile)
router.get("/profile" , deleteProfile)

module.exports = router