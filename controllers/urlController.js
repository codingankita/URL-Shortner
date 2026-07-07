const {nanoid} = require('nanoid');
const Url = require('../models/url');
const { writeToRedis, readFromRedis } = require('../config/redis');
const validateUrls = require('../utils/validateURLs');

async function handleShortURL(req, res) {    
    try {
        if(req.body.longUrl == undefined){
            return res.status(400).json({ error: 'Long URL is required' });
        };
        if(!validateUrls.validateMyUrls(req.body.longUrl)){
            return res.status(400).json({ error: 'Invalid URL format' });
        }else{
            const longUrl  = req.body.longUrl;
            validateUrls.normalizeUrl(longUrl).then(async (normalizedUrl) => {
                console.log("Normalized URL: "+normalizedUrl);
                const existingEntryRedis = await readFromRedis(normalizedUrl);
                if (existingEntryRedis) {
                    console.log("Found in Redis: "+existingEntryRedis);
                    return res.status(200).json({ shortId: existingEntryRedis });
                }else{
                    const existingEntry = await Url.findOne({ originalUrl: normalizedUrl });
                    if (existingEntry) {
                        console.log("Here is the existing entry from MongoDB: "+existingEntry.shortUrl);
                        return res.status(200).json({ shortId: existingEntry.shortUrl });
                    }else{
                        console.log("Inside controller"+longUrl);
                        const shortId = nanoid(8);
                        console.log("Generated shortId: "+shortId);
                        await Url.create({ originalUrl: longUrl, shortUrl: shortId });
                        return res.status(201).json({ shortId });
                    }
                }
            });
        }
    } catch (err) {
        console.error("Error:", err);              // full error
        console.error("Message:", err.message);       // readable text
        console.error("Code:", err.code);             // numeric code
        console.error("Name:", err.name);            // type of error
    }
};

async function handleRedirect(req, res) {
    try{
        const shortId = req.params.shortId;
        const existingEntryRedis = await readFromRedis(shortId);
        if(existingEntryRedis){
            console.log("Found in Redis: "+existingEntryRedis);
            res.redirect(existingEntryRedis);
            return;
        }else{
            console.log("Inside handleRedirect for shortId: "+shortId);
            const entry = await Url.findOneAndUpdate({ shortUrl: shortId }, { $inc: { clicks: 1 } });
            await writeToRedis(entry.shortUrl, entry.originalUrl);
            console.log("Here is the entry from MongoDB: "+entry);
            res.redirect(entry.originalUrl);
        }
    }catch(err){
        console.error("Error:", err);   
    } 
};

async function handleHealthCheck(req, res) {
    try {
        res.status(200).json({ status: 'UP' });
    } catch (err) {
        console.error("Error:", err);   
    }
};

async function handleCustomShortURL(req, res) {
    try {
        const { longUrl, customShortId } = req.body;
        if (!longUrl || !customShortId) {
            return res.status(400).json({ error: 'Both longUrl and customShortId are required' });
        }
        var existingEntryRedis = await readFromRedis(customShortId);
        if (existingEntryRedis) {
            return res.status(409).json({ error: 'Custom short URL already exists' });
        }else{
            const existingEntry = await Url.findOne({ shortUrl: customShortId });
            if (existingEntry) {
                await writeToRedis(customShortId, existingEntry.originalUrl);
                return res.status(409).json({ error: 'Custom short URL already exists' });
            }else{
                console.log("Custom shortId is available: "+customShortId);
                await Url.create({ originalUrl: longUrl, shortUrl: customShortId });
                return res.status(201).json({ shortId: customShortId });
            }
        }
    } catch (err) {
        console.error("Error:", err);   
    }           
};

async function handleUpdateURL(req, res) {
    try {
        const shortId = req.params.shortId;
        const { newLongUrl } = req.body;
        if (!newLongUrl) {
            return res.status(400).json({ error: 'New long URL is required' });
        }       
        if(!validateUrls.validateMyUrls(newLongUrl)){
            return res.status(400).json({ error: 'Invalid URL format' });
        }else{
            validateUrls.normalizeUrl(newLongUrl).then(async (normalizedUrl) => {
                console.log("Normalized URL: "+normalizedUrl);
                const existingEntry = await Url.findOneAndUpdate({ shortUrl: shortId }, { originalUrl: normalizedUrl }, { new: true });
                if (existingEntry) {
                    await deleteFromRedis(shortId); // Remove the old entry from Redis
                    return res.status(200).json({ message: 'URL updated successfully', updatedEntry: existingEntry });
                }
            });
        }
    } catch (err) {
        console.error("Error:", err);   
    }
};

module.exports = { handleShortURL ,handleRedirect, handleHealthCheck, handleCustomShortURL, handleUpdateURL};