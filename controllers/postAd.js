// NOTICE: Backend operations in this file have been migrated to ama_endpoint.
// Cloudinary uploads, Stripe payments, and backend proxying now handled by
// ama_endpoint/controllers/uploadToCloudinary.js and paymentRoutes.js.
// This file is kept for reference only - the handler returns a redirect.
//
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");
// const { configDotenv } = require("dotenv");
// const ChargeForItem = require("./chargeForItem");
// const createFreeAdvertEntry = require("./adsManagement/createFreeAdvertEntry");
// const cloudinary = require('cloudinary').v2;
//
// configDotenv();
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });
//
// const folderPath = path.join(__dirname, "../public/userUpload/");
// fs.access(folderPath, fs.constants.W_OK, (err) => { ... });
// const storage = multer.diskStorage({ ... });
// const upload = multer({ ... });

const PostAd = (req, res) => {
    return res.json({ error: "Ad creation is now handled by ama_endpoint. Use the new API endpoint at /y/upload-files for Cloudinary uploads." });
};

module.exports = PostAd;
