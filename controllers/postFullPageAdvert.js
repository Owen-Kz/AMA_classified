// NOTICE: Backend operations migrated to ama_endpoint.
// Cloudinary uploads handled by ama_endpoint/controllers/uploadToCloudinary.js.
// This file is kept for reference only.
//
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");
// const { configDotenv } = require("dotenv");
// const ChargeForItem = require("./chargeForItem");
// const cloudinary = require('cloudinary').v2;
// ... (multer + cloudinary setup commented out)

const postFullpageAd = (req, res) => {
    return res.json({ error: "Full-page ad creation is now handled by ama_endpoint." });
};

module.exports = postFullpageAd;
