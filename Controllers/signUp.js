const User = require("../models/models")

exports.signup = async (req,res) => {
    try{
        const {name, email,password} = req.body;

        if( !name || !email || !password){
            return res.status(400).json({
                message : "All Fields are Required"
            })
        }

        const existingUser = await User.findOne({email})

        if(existingUser != null)
            return res.status(400).json({
               message: "User Already Exists"
            })
        
        const user = await User.create({
            name,
            email,
            password
        })

        return res.status(201).json({
            message: "User Created",
            user
        });
    }catch (err){
        if (err.code === 11000) {
            return res.status(400).json({ message: "Email already exists" });
        }
        console.error(err);
        return res.status(500).json({
            error : err.message
        });
    }
}