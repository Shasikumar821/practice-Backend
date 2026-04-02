const mongoose = require("mongoose")
const User = require("./models")

const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, "Title is Required"],
        trim : true,
        minlength : 3,
        maxlength : 100
    },
    subtitle : {
        type : String,
        required : [true, "Subtitle is Required"],
        trim : true,
        maxlength : 200
    },
    completed : {
        type : Boolean,
        default : false
    },
    author : {
        type : new mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    }
},{
    timestamps : true,
    versionKey : false
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post;