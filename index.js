require("dotenv").config();
import { connectDB } from './connect';
import { connectRedis } from './config/redis';
import express, { json } from 'express';
import Url from './models/url';
import urlRoutes from './routes/url';

const app = express();
app.use(json());

connectDB().then(() => {
    console.log('✅ MongoDB Connected');
    // Only start the server *after* DB connects
    connectRedis().then(() => {
        console.log('✅ Redis Connected');
        app.use('/', urlRoutes);
        app.listen(8001, () => console.log('🚀 Server running on port 8001'));
    });
  })
  .catch(err => console.error('❌ MongoDB Error:', err.message));


