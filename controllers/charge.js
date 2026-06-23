// NOTICE: Payment charge logic migrated to ama_endpoint.
// See ama_endpoint/routes/paymentRoutes.js (createCheckoutSession).
// Payment encryption/ad-routing handled server-side now.
// This file is kept for reference only.
//
// const { config } = require('dotenv')
// const CheckForFullPage = require('./checkForFullpage')
// const CheckForStaticAdvert = require('./CheckForStatic')
// const FormatDate = require('./FormatDate')
// const encrypt = require('./utils/encryptTest')
// const stripe = require('stripe')(process.env.STRIPE_API_TEST_KEY)

const charge = async (req, res) => {
    return res.json({ error: "Payment processing is now handled by ama_endpoint's /y/create-checkout-session endpoint." });
};

module.exports = charge;
