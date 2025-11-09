// const express = require('express');
// const urlRoutes = require('./routes/url');
// const app = express();
const {connectDB}  = require('./connect');
// const PORT = 8001;
// const uri = "mongodb+srv://ankita-bhatt_06:abctest@cluster0.8dlfya3.mongodb.net/?appName=Cluster0";

// connectDB(uri).then(() => {
//         console.log("Connected to MongoDB");
//         app.use(express.json());
//         app.use('/url', urlRoutes);
//         app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
// }).catch((err) => {
//     console.error("Failed to connect to MongoDB", err);
// });

const express = require('express');
const urlRoutes = require('./routes/url');

const app = express();
app.use(express.json());

connectDB().then(() => {
    console.log('✅ MongoDB Connected');
    // Only start the server *after* DB connects
    app.use('/url', urlRoutes);
    app.listen(8001, () => console.log('🚀 Server running on port 8001'));
  })
  .catch(err => console.error('❌ MongoDB Error:', err.message));


