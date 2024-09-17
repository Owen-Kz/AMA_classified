const CheckForStaticAdvert = require('../CheckForStatic');
const getFutureDate = require('./fuureDates');

const stripe = require('stripe')(process.env.STRIPE_API_TEST_KEY)

const StaticAdvertPage = async (req,res) =>{
    const sessionId = req.cookies.sessionId;  // Retrieve session ID from URL or stored data

    if (!sessionId || !req.cookies._t) {
      return res.status(400).send('Invalid Session, Go back and make payment to proceed');
    }
  
    try {
      
      const hasStaticAdvert = await CheckForStaticAdvert()
      if(hasStaticAdvert.length > 0){
      
        const expiration_date = await FormatDate(hasFullPageAdvert[0].expiry_date)
        return res.render("advertAlreadyExists", {username:req.user.u_name, expiry_date:expiration_date, advertfor:"Static Advert"})
      }else{
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const paymentIntentId = session.payment_intent;
      const paymentStatus = session.payment_status 
    
      const currentPackage = req.cookies._pkg
      let expiry = ""
      if(currentPackage === "static_advert_3_months"){
        expiry = await getFutureDate(3)
      }else if(currentPackage === "static_advert_6_months"){
        expiry = await getFutureDate(6)
        
      }

      if(paymentStatus === "paid"){
      res.cookie('paymentId', paymentIntentId, { maxAge: 1 * 24 * 60 * 60 * 1000 }); // Cookie valid for 7 days
    //   res.send('Payment completed, cookie has been set.');
    res.render("postBrandAdvert", {username:req.user.u_name, paymentIntentId:paymentIntentId, advertType:"static_advert", advertDuration:expiry})
      }else{
        return res.json({error:"Invalid Transaction / Payment not confirmed"})
      }
    }

    } catch (err) {
      console.error(err);
      res.status(500).send('Unable to retrieve session.');
    }
}


module.exports = StaticAdvertPage