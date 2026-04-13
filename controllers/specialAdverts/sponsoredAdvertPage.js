const getFutureDate = require('./fuureDates');

const stripe = require('stripe')(process.env.STRIPE_API_TEST_KEY)

const sponsoredAdvertPage = async (req,res) =>{
    // const sessionId = req.cookies.sessionId;  // Retrieve session ID from URL or stored data

    // if (!sessionId || !req.cookies._t) {
    //   return res.status(400).send('Invalid Session, Go back and make payment to proceed');
    // }
  
    try {
      // const session = await stripe.checkout.sessions.retrieve(sessionId);
      // const paymentIntentId = session.payment_intent;
      // const paymentStatus = session.payment_status 

      const currentPackage = req.cookies._pkg
      let expiry = ""
      if(currentPackage === "sponsored_advert_3_months"){
        expiry = await getFutureDate(3)
      }else if(currentPackage === "sponsored_advert_6_months"){
        expiry = await getFutureDate(6)
      }
      // if(paymentStatus === "paid"){
      // res.cookie('paymentId', paymentIntentId, { maxAge: 1 * 24 * 60 * 60 * 1000 }); // Cookie valid for 7 days
    //   res.send('Payment completed, cookie has been set.');
    res.render("postBrandAdvert", {username:req.user.u_name, advertType:"sponsored_advert", advertDuration:expiry})
      // }else{
      //   return res.json({error:"Invalid Transaction / Payment not confirmed"})
      // }

    } catch (err) {
      console.error(err);
      res.status(500).send('Unable to retrieve session.');
    }
}


module.exports = sponsoredAdvertPage