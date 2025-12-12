const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb+srv://root:root@cluster0.jnqtbkt.mongodb.net/Task_Manager';
        await mongoose.connect(uri);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("Database Connection Failed", error);
    }
};

module.exports = connectDB;
