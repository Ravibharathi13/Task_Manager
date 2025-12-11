const express = require('express');
const Category = require('../models/Category');
const auth = require('../middleware/auth');

const router = express.Router();

// Create Category
router.post('/', auth, async (req, res) => {
    const { title } = req.body;

    const category = new Category({ title, user: req.userId });
    await category.save();

    res.send("Category Created");
});

// Read All Categories
router.get('/', auth, async (req, res) => {
    const categories = await Category.find({ user: req.userId });
    res.json(categories);
});

// Update Category
router.put('/:id', auth, async (req, res) => {
    const { title } = req.body;

    await Category.findOneAndUpdate(
        { _id: req.params.id, user: req.userId },
        { title }
    );

    res.send("Category Updated");
});

// Delete Category
router.delete('/:id', auth, async (req, res) => {
    await Category.findOneAndDelete({ _id: req.params.id, user: req.userId });
    res.send("Category Deleted");
});

module.exports = router;
