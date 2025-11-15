const express = require('express');
const { handleShortURL , handleRedirect} = require('../controllers/urlController');
const router = express.Router();
console.log("Inside URL routes");
router.post('/', handleShortURL);
router.get('/:shortId', handleRedirect);
module.exports = router;