const { nanoid } = require("nanoid");
const URL = require("../models/url");
async function handleGenerateNewShortURL(req, res) {

    if (!req.body || !req.body.redirectURL) {
        return res.status(400).json({
            error: "url is required",
        });
    }

    let redirectURL = req.body.redirectURL;

    if (
        !redirectURL.startsWith("http://") &&
        !redirectURL.startsWith("https://")
    ) {
        redirectURL = "https://" + redirectURL;
    }

    const shortID = nanoid(8);

    await URL.create({
        shortId: shortID,
        redirectURL: redirectURL,
        visitHistory: [],
    });

    const allUrls = await URL.find({});

    return res.render("home", {
        id: shortID,
        urls: allUrls,
    });
}

async function handleGetAnalytics(req, res) {

    const shortId = req.params.shortId;

    const result = await URL.findOne({ shortId });

    if (!result) {
        return res.status(404).json({
            error: "Short URL not found",
        });
    }

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};