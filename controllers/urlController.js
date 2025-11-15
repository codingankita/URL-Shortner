const {nanoid} = require('nanoid');
const Url = require('../models/Url');

async function handleShortURL(req, res) {    
    try {
        if(req.body.longUrl == undefined){
            return res.status(400).json({ error: 'Long URL is required' });
        };
        const longUrl  = req.body.longUrl;
        console.log("Inside controller"+longUrl);
        const shortId = nanoid(8);
        console.log("Generated shortId: "+shortId);
        await Url.create({ originalUrl: longUrl, shortUrl: shortId });
        return res.status(201).json({ shortId });
    } catch (err) {
        console.error("❌ Error:", err);              // full error
        console.error("Message:", err.message);       // readable text
        console.error("Code:", err.code);             // numeric code
        console.error("Name:", err.name);             // type of error
    }
};

async function handleRedirect(req, res) {
    try{
        const shortId = req.params.shortId;
        const entry = await Url.findOneAndUpdate({ shortUrl: shortId }, { $inc: { clicks: 1 } });
        res.redirect(entry.originalUrl);
    }catch(err){
        console.error("❌ Error:", err);   
    } 
};

// app.get('/:shortId', async (req, res) => {
        
//   });

module.exports = { handleShortURL ,handleRedirect };