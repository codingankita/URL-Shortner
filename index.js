const {connectDB}  = require('./connect');
const express = require('express');
const Url = require('./models/Url');
const urlRoutes = require('./routes/url');

const app = express();
app.use(express.json());

connectDB().then(() => {
    console.log('✅ MongoDB Connected');
    // Only start the server *after* DB connects
    app.use('/', urlRoutes);
    app.listen(8001, () => console.log('🚀 Server running on port 8001'));
  })
  .catch(err => console.error('❌ MongoDB Error:', err.message));


