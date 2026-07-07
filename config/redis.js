const { createClient } = require('redis');
const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

async function connectRedis() {
    try {
        await redisClient.connect();
    } catch (err) {
        console.error(err);
    }
}

async function writeToRedis(key, value) {
    try {
        await redisClient.set(key, value, EX, 30);
    } catch (err) {
        console.error(err);
    }
}

async function readFromRedis(value) {
    try {
        const key = await redisClient.get(value);
        return key;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function deleteFromRedis(key) {
    try {
        await redisClient.del(key); 
    } catch (err) {
        console.error(err);
    }
}

module.exports = { redisClient, connectRedis, writeToRedis, readFromRedis, deleteFromRedis };