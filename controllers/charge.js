// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const { config } = require('dotenv')
const CheckForFullPage = require('./checkForFullpage')
const CheckForStaticAdvert = require('./CheckForStatic')
const FormatDate = require('./FormatDate')


const stripe = require('stripe')(process.env.STRIPE_API_TEST_KEY)

const charge =  async (req, res) => {
    if(req.cookies._t){
      try{
        let package = ""
        const userId = req.user.id
  
        const {_token, amount, submit} = req.body

        if(amount <= 2.00 && _token !== 'brand_ad' && _token !== "business_ad"){
            package = "normal_package"
        }else if(amount >= 3.00 && _token !== 'brand_ad' && _token !== "business_ad"){
            package = "boosted_package"
        }else if(amount == 5.00 && _token !== 'brand_ad'){
            package = "normal_package"
        }else if(amount > 5.00 && _token !== 'brand_ad'){
            package = "boosted_package"
        }else if(_token === "brand_ad"){
          const {current_pack} =req.body 
          package = current_pack
        }
async function ChargeForItem(fincalendpoint){
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
    success_url: `${process.env.CURRENT_DOMAIN}/post/${fincalendpoint}`,
    cancel_url: `${process.env.CURRENT_DOMAIN}/dashboard`,
  });


  res.cookie('sessionId', session.id, { maxAge: 7 * 24 * 60 * 60 * 1000 }); // Cookie valid for 7 days
  res.cookie("_pay_advert", amount, {maxAge: 1 * 24 * 60 * 60 * 1000 })
  res.cookie("_pkg", package, {maxAge: 1 * 24 * 60 * 60 * 1000 })
 
  res.redirect(303, session.url);
}
if(_token === "brand_ad" && (package === "fullpage_6_months" || package === "fullpage_3_months")){
  // Check if a full page advert exists 
  const hasFullPageAdvert = await CheckForFullPage()
  if(hasFullPageAdvert.length > 0){
   
    const expiration_date = await FormatDate(hasFullPageAdvert[0].expiry_date)

    return res.render("advertAlreadyExists", {username:req.user.u_name, expiry_date:expiration_date, advertfor:"Full Page"})
  }else{
    await ChargeForItem("advert/fullpage")
  }
}else if(_token === "brand_ad" && (package === "static_advert_6_months" || package === "static_advert_3_months")){
  const hasStaticAdvert = await CheckForStaticAdvert()
  if(hasStaticAdvert.length > 0){
  
    const expiration_date = await FormatDate(hasFullPageAdvert[0].expiry_date)
    return res.render("advertAlreadyExists", {username:req.user.u_name, expiry_date:expiration_date, advertfor:"Static Advert"})
  }else{
    await ChargeForItem("advert/static")
  }
}else if(package === "slideshow_3_months" || package === "slideshow_6_months"){
  await ChargeForItem("advert/slideshow")
}else if(package === "sponsored_advert_3_months" || package === "sponsored_advert_6_months"){
  await ChargeForItem("advert/sponsored")
}else{
  await ChargeForItem("advert")
}

  
 

}catch(error){
    return res.json({error:error.message})
}
}else{
    return res.json({error:"User Not LoggedIn"})
}
}

module.exports = charge