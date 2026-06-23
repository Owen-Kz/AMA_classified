// NOTICE: Stripe session retrieval migrated to ama_endpoint.
// This file is kept for reference only.
//
// const CheckForStaticAdvert = require('../CheckForStatic');
// const getFutureDate = require('./fuureDates');
// const stripe = require('stripe')(process.env.STRIPE_API_TEST_KEY)

const StaticAdvertPage = async (req,res) =>{
    return res.render("postBrandAdvert", {username:req.user?.u_name || 'User', advertType:"static_advert", advertDuration:""})
}

module.exports = StaticAdvertPage
