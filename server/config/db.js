// server/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://enessertkan:Password123@cluster0.55mfjdg.mongodb.net/chatApp?retryWrites=true&w=majority', {
            useNewUrlParser: true, // This option is no longer needed
            useUnifiedTopology: true // This option is no longer needed
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
