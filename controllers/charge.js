// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const { config } = require('dotenv')
const CheckForFullPage = require('./checkForFullpage')
const CheckForStaticAdvert = require('./CheckForStatic')
const FormatDate = require('./FormatDate')
const encrypt = require('./utils/encryptTest')


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
        const encryptedAmount = await encrypt(amount);
        const encryptedPackage = await encrypt(package);
        const encryptedToken = await encrypt(_token);
        
        // Store the encrypted data, key, and iv in cookies
        res.cookie("__amnt", encryptedAmount.encryptedData, { maxAge: 1 * 24 * 60 * 60 * 1000 });
        res.cookie("__amnt_key", encryptedAmount.key, { maxAge: 1 * 24 * 60 * 60 * 1000 });
        res.cookie("__amnt_iv", encryptedAmount.iv, { maxAge: 1 * 24 * 60 * 60 * 1000 });
        
        res.cookie("__pkg", encryptedPackage.encryptedData, { maxAge: 1 * 24 * 60 * 60 * 1000 });
        res.cookie("__pkg_key", encryptedPackage.key, { maxAge: 1 * 24 * 60 * 60 * 1000 });
        res.cookie("__pkg_iv", encryptedPackage.iv, { maxAge: 1 * 24 * 60 * 60 * 1000 });
        
        res.cookie("__tkn", encryptedToken.encryptedData, { maxAge: 1 * 24 * 60 * 60 * 1000 });
        res.cookie("__tkn_key", encryptedToken.key, { maxAge: 1 * 24 * 60 * 60 * 1000 });
        res.cookie("__tkn_iv", encryptedToken.iv, { maxAge: 1 * 24 * 60 * 60 * 1000 });
        


if(_token === "brand_ad" && (package === "fullpage_6_months" || package === "fullpage_3_months")){
  // Check if a full page advert exists 
  const hasFullPageAdvert = await CheckForFullPage()
  if(hasFullPageAdvert.length > 0){
   
    const expiration_date = await FormatDate(hasFullPageAdvert[0].expiry_date)

    return res.render("advertAlreadyExists", {username:req.user.u_name, expiry_date:expiration_date, advertfor:"Full Page"})
  }else{
    res.redirect(`/post/advert/fullpage`)
    // await ChargeForItem("advert/fullpage")
  }
}else if(_token === "brand_ad" && (package === "static_advert_6_months" || package === "static_advert_3_months")){
  const hasStaticAdvert = await CheckForStaticAdvert()
  if(hasStaticAdvert.length > 0){
  
    const expiration_date = await FormatDate(hasFullPageAdvert[0].expiry_date)
    return res.render("advertAlreadyExists", {username:req.user.u_name, expiry_date:expiration_date, advertfor:"Static Advert"})
  }else{
    // await ChargeForItem("advert/static")
    res.redirect("/post/advert/static")
  }
}else if(package === "slideshow_3_months" || package === "slideshow_6_months"){
  // await ChargeForItem("advert/slideshow")
  res.redirect("/post/advert/slideshow")
}else if(package === "sponsored_advert_3_months" || package === "sponsored_advert_6_months"){
  // await ChargeForItem("advert/sponsored") 
  res.redirect("/post/advert/sponsored")
}else{
  // await ChargeForItem("advert")
  res.redirect("/post/advert")
}

  
 

}catch(error){
    return res.json({error:error.message})
}
}else{
    return res.json({error:"User Not LoggedIn"})
}
}

module.exports = charge