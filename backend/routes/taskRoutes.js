const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// Create Task
router.post('/', auth, async (req, res) => {
    const { title, description, category } = req.body;

    const task = new Task({
        title,
        description,
        category,
        user: req.userId
    });

    await task.save();

    res.send("Task Added");
});

// Read All Tasks (with category info)
router.get('/', auth, async (req, res) => {
    const tasks = await Task.find({ user: req.userId }).populate("category");
    res.json(tasks);
});

// Update Task
router.put('/:id', auth, async (req, res) => {
    const { title, description, status, category } = req.body;

    await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.userId },
        { title, description, status, category }
    );

    res.send("Task Updated");
});

// Delete Task
router.delete('/:id', auth, async (req, res) => {
    await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    res.send("Task Deleted");
});

module.exports = router;
