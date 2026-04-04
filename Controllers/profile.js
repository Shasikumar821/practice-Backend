const User = require("../models/models");
const express = require("express")
const router = express.Router();

exports.getProfile = async (req, res) => {
    try {
        const profile = await User.findOne({ email}).populate("author", "email" , "name");
        if(profile == null) return res.status(203).json("No Data Found");
        res.status(201).json({ profile });
    }catch (err){
        res.status(500).json({ error : ` ${err}`});
    }
}

exports.UpdateProfile = async (req, res) => {
    try{
        const profile = await User.findOneAndUpdate({ email }, req.body , { new : true });
        if(profile == null) return res.status(203).json("Server Issue");
        res.status(201).json("Profile Updated");
    }catch (err){
        res.status(500).json({ error : `${err}`});
    }
}

exports.deleteProfile = async (req, res) => {
    try{
        const profile = await User.findOneAndDelete({ email });
        if(profile == null) return res.status(203).json("Server Issue");
        res.status(202).json("Profile Deleted");
    }catch (err){
        res.status(500).json({ error : `${err}`});
    }
}