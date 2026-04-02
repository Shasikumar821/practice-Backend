const joi = require("joi")

const validatePost = (data) => {
    const schema = joi.object({
        title : joi.string().min(3).max(100).required().messages({
            "string.empty" : "Title is Required",
            "string.min" : "Title must be atleast 3 characters",
            "string.max" : "Title must be less than 100 characters"
        }),
        subtitle : joi.string().min(3).max(200).required().messages({
            "string.empty" : "Subtitle is Required",
            "string.min" : "Subtitle must be atleast 3 characters",
            "string.max" : "Subtitle must be less than 200 characters"
        }),
        completed : joi.boolean()
    }).unknown(false)

    return schema.validate(data, {abortEarly :false});
}

module.exports = validatePost;