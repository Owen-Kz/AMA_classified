// NOTICE: Profile image uploads migrated to ama_endpoint.
// See ama_endpoint/controllers/updateProfileImage.js.
// This file is kept for reference only.
//
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");
// const { configDotenv } = require("dotenv");
// const ChargeForItem = require("./chargeForItem");
// const cloudinary = require('cloudinary').v2;
// ... (multer + cloudinary setup commented out)

const UpdateProfileImage = (req, res) => {
    return res.json({ error: "Profile image uploads are now handled by ama_endpoint's /y/update-profile-image endpoint." });
};

module.exports = UpdateProfileImage;
