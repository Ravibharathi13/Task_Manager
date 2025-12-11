const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://root:root@cluster0.jnqtbkt.mongodb.net/Task_Manager');
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("Database Connection Failed", error);
    }
};

module.exports = connectDB;
