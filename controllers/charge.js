// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const { config } = require('dotenv')


const stripe = require('stripe')(process.env.STRIPE_API_TEST_KEY)

const charge =  async (req, res) => {
    if(req.cookies._t){
        let package = ""
        const userId = req.user.id
  
        const {_token, amount, submit} = req.body

        if(amount <= 2.00 && _token !== 'brand_ad' && _token !== "business_ad"){
            package = "normal_package"
        }else if(amount >= 3.00 && _token !== 'brand_ad' && _token !== "business_ad"){
            package = "boosted_package"
        }else if(amount == 5.00){
            package = "normal_package"
        }else if(amount > 5.00){
            package = "boosted_package"
        }
  
    try{
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${_token}_${package}`,
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.CURRENT_DOMAIN}/post/advert`,
    cancel_url: `${process.env.CURRENT_DOMAIN}/dashboard`,
  });


  res.cookie('sessionId', session.id, { maxAge: 7 * 24 * 60 * 60 * 1000 }); // Cookie valid for 7 days
  res.redirect(303, session.url);

}catch(error){
    return res.json({error:error.message})
}
}else{
    return res.json({error:"User Not LoggedIn"})
}
}

module.exports = charge