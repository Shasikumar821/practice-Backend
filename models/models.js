const mongoose = require("mongoose")
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String,
        required: true,
        unique: true
    },
    password : {
        type : String,
        required: true,
    },
    phone : {
        type : String,
        minlength : 10,
        maxlength : 10
    },
    Address : {
        type : String,
        maxlength : 300,
    },
},{
    foreignkey : false,
    timeStamp : true
})

userSchema.pre("save", async function() {
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.set("toJSON", {
    transform: (doc,ret) => {
        delete ret.password;
        return ret;
    }
})

module.exports = mongoose.model("User", userSchema);