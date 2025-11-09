const express = require('express');
const { handleShortURL } = require('../controllers/urlController');
const router = express.Router();
console.log("Inside URL routes");
router.post('/', handleShortURL);

module.exports = router;