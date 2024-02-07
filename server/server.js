const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

// Import DB config
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB(); // This should come after importing connectDB

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Import routes
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Socket.io connection
io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    // Example: on joining a room
    socket.on('joinRoom', ({ username, room }) => {
        // Implement joining a room
    });

    // Example: on chat message
    socket.on('sendMessage', (message) => {
        // Implement sending a message
    });

    // Example: on disconnect
    socket.on('disconnect', () => {
        console.log('User has left');
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
