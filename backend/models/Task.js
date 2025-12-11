const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: { type: String, default: "pending" }, // pending | completed
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model("Task", TaskSchema);
