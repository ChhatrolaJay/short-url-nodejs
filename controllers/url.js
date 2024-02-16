const URL = require("../models/url");
const shortid = require("shortid");

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'url is required' });
    const shortId = shortid();
    const newUrl = await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],

    });
    return res.json({ newUrl: newUrl });
}

async function handleGetOriginalUrl(req, res) {
    const shortId = req.params.shortId;
    const updatedEntry = await URL.findOneAndUpdate(
        {
          shortId,
        },
        {
          $push: {
            visitHistory: {
              timestamp: Date.now(),
            },
          },
        }
      );
    res.redirect(updatedEntry.redirectUrl);
}

async function handleGetAnalytics(req,res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetOriginalUrl,
    handleGetAnalytics,
}