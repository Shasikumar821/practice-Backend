const mongoose = require("mongoose")


const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected");
        console.log("MONGO_URI:", process.env.MONGO_URI);
    }catch (err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;