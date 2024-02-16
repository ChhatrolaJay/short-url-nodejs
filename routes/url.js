const express = require("express");
const { handleGenerateNewShortUrl, handleGetOriginalUrl, handleGetAnalytics } = require("../controllers/url");

const router = express.Router();

router.post('/',handleGenerateNewShortUrl);

router.get('/:shortId',handleGetOriginalUrl);

router.get('/analytics/:shortId',handleGetAnalytics)

module.exports = router;