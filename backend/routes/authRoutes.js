const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = "your_secret_key";

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        const hashed = await bcrypt.hash(password, 10);

        const user = new User({ username, password: hashed });
        await user.save();

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });

    } catch {
        res.status(400).json({ message: "Registration failed" });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });

    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
