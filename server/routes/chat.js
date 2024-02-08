const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Message = require('../models/Message');
const Room = require('../models/Room');

// POST /api/chat/message - Store a new chat message or create/join a room
router.post('/message', [
    check('from_user', 'Sender username is required').not().isEmpty(),
    check('room', 'Room name is required').not().isEmpty(),
    check('message', 'Message content cannot be empty').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { from_user, room, message } = req.body;

    try {
        // Check if the room exists, if not, create it
        let existingRoom = await Room.findOne({ name: room });
        if (!existingRoom) {
            existingRoom = new Room({ name: room });
            await existingRoom.save();
        }

        // Store the message in the database
        const newMessage = new Message({
            from_user,
            room,
            message,
            date_sent: new Date()
        });

        const savedMessage = await newMessage.save();

        res.json(savedMessage);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET /api/chat/messages - Get messages for a room
router.get('/messages/:room', async (req, res) => {
    try {
        const messages = await Message.find({ room: req.params.room }).sort({ date_sent: 1 });
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
