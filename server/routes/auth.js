const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust the path as necessary

routes.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existUser = await user.findOne({ username });
        if (existUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const newUser = new user({
            username,
            email,
            password
        });
        await newUser.save();
        return res.status(201).json({ message: 'User created successfully' });
    } catch (e) {
        return res.status(500).json(e);
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Username or Password' });
        }

        const passCheck = await bcrypt.compare(password, user.password);
        if (!passCheck) {
            return res.status(400).json({ status: false, message: 'Invalid Username or Password' });
        }
        return res.status(200).json({
            status: true,
            email: user.email,
            message: 'User logged in successfully'
        });
    } catch (e) {
        return res.status(500).json(e);
    }
});



module.exports = router;
