// NOTICE: Backend operations in this file have been migrated to ama_endpoint.
// Cloudinary uploads and backend proxying now handled by
// ama_endpoint/controllers/uploadToCloudinary.js.
// This file is kept for reference only.
//
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");
// const { configDotenv } = require("dotenv");
// const ChargeForItem = require("./chargeForItem");
// const cloudinary = require('cloudinary').v2;
// ... (multer + cloudinary setup commented out)

const UpdateAdvert = (req, res) => {
    return res.json({ error: "Advert updates are now handled by ama_endpoint. Use the new API endpoint at /y/upload-files for Cloudinary uploads." });
};

module.exports = UpdateAdvert;
