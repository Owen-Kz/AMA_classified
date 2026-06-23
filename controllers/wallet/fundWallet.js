// NOTICE: Stripe wallet top-up migrated to ama_endpoint.
// See ama_endpoint/routes/paymentRoutes.js (createCheckoutSession).
// This file is kept for reference only.
//
// const { config } = require("dotenv")
// const decryptText = require("../utils/decryptText")
// const saveWalletTransaction = require("./SaveWalletTransaction")
// const updateWalletBalance = require("./updateWalletBalance")
// config()
// const stripe = require('stripe')(process.env.STRIPE_API_TEST_KEY)

const fundWallet = async (req, res) => {
    return res.json({ error: "Wallet top-up is now handled by ama_endpoint's /y/create-checkout-session endpoint." });
};

module.exports = fundWallet;
