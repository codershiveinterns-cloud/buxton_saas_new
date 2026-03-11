const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            console.error('MongoDB URI is not defined in environment variables.');
            process.exit(1);
        }
        await mongoose.connect(uri);
        console.log('MongoDB connected successfully');
        console.log('------------------------------');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
