const mongoose = require('mongoose');

// Connect to MongoDB
async function connectDB() {
    await mongoose.connect(process.env.MONGO_URI);
}

module.exports = {
    connectDB
}



