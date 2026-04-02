const User = require("../models/models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

let refreshTokensList = [];

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body

        if(!email || !password){
            return res.status(404).json({
                message : "All Fields are Required"
            })
        }

        const user = await User.findOne({email})

        if(user == null){
            return res.status(404).json({
                message : "User Not Found"
            })
        }
        const payload = { email: user.email };
        const accessToken = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
        const refreshToken = await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        refreshTokensList.push(refreshToken);

        if(await bcrypt.compare(password,user.password)){
            return res.status(201).json({
                message : "Success",
                accessToken,
                refreshToken
            })
        }else {
            return res.status(404).json({
                message : "Not Allowed"
            })
        }
    }catch (err){
        return res.status(500).json({
            message : err.message
        })
    }
}

exports.refreshTokensList = refreshTokensList;