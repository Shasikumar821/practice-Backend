const express = require("express")
const router = express.Router()

const { createPost } = require("../Controllers/postCreate")

router.post("/posts", createPost)

module.exports = router