const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

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
    }
},{
    foreignkey : false
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