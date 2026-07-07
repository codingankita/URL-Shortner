const allowedProtocols = ['http:', 'https:'];

async function validateMyUrls(longUrl) {
    try {
        // Add URL validation logic here
        const urlPattern = new URL(longUrl);
        if (!allowedProtocols.includes(urlPattern.protocol)) {
            return false;
        }
        return true;
    } catch (err) {
        console.error("Error validating URL:", err);
        return false;
    }
}

async function normalizeUrl(longUrl) {
    try {
        const urlPattern = new URL(longUrl.trim());
        urlPattern.hash = ''; // Remove the hash fragment
        if(urlPattern.pathname.endsWith('/')) {
            urlPattern.pathname = urlPattern.pathname.slice(0, -1); // Remove the trailing slash if it's the only character in the pathname
        }
        if((urlPattern.protocol === 'http:' && urlPattern.port === '8080') || (urlPattern.protocol === 'https:' && urlPattern.port === '8443')) {
            urlPattern.port = ''; // Remove the port if present
        }
        return urlPattern.toString();
    }   catch (err) {
        console.error("Error normalizing URL:", err);
        return longUrl; // Return the original URL if normalization fails
    }
};

module.exports = { validateMyUrls, normalizeUrl };