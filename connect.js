const mongoose = require('mongoose');

async function connectDB() {
    mongoose.connect('mongodb+srv://ankita-bhatt_06:abctest@cluster0.8dlfya3.mongodb.net/urlshortner')
}

module.exports = {
    connectDB
}



