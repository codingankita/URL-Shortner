const mongoose = require('mongoose');

async function connectDB() {
    mongoose.connect('mongodb+srv://ankita000bhatt_db_user:r71Og2rwKTenKWWL@url-shortner.6myld4p.mongodb.net/?appName=URL-shortner')
}

module.exports = {
    connectDB
}



