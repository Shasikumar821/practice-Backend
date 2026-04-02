const post = require("../models/postModel");
const validatePost = require("../models/secureModels/postSecureModel")

exports.createPost = async (req, res) => {
    const { error} = validatePost(req.body);
    if(error) {
        return res.status(400).json({ error: error.details.map((err) => err.message)});
    }

    try{
        const {title, subtitle, completed} = req.body;
        const newPost = await post.create({
            title,
            subtitle,
            completed : completed || false,
            author : req.user.email
        })
        res.status(201).json(newPost);
    }catch(err){
        res.status(500).json({ error: "Server Error" });
    }
}