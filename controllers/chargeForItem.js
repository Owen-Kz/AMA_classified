const { config } = require("dotenv")
const decryptText = require("./utils/decryptText")
const createPaidAdvertEntry = require("./adsManagement/createPaidAdvertEntry")
const ChargeWalletBalance = require("./wallet/chargeWalletForItem")
const stripe = require('stripe')(process.env.STRIPE_API_TEST_KEY)

const ChargeForItem = async (req,res, itemId) =>{
    let package = ""
    try{
      
    
    if(req.cookies.__amnt){
    
    const amountEncrypted = req.cookies.__amnt;
    const amountKey = req.cookies.__amnt_key;
    const amountIv = req.cookies.__amnt_iv;
    
    const tokenEncrypted = req.cookies.__tkn;
    const tokenKey = req.cookies.__tkn_key;
    const tokenIv = req.cookies.__tkn_iv;
    
    const packageEncrypted = req.cookies.__pkg;
    const packageKey = req.cookies.__pkg_key;
    const packageIv = req.cookies.__pkg_iv;
    
    // decryptText each value
    const amount = await decryptText(amountEncrypted, amountKey, amountIv);
    const _token = await decryptText(tokenEncrypted, tokenKey, tokenIv);
    const currentPack = await decryptText(packageEncrypted, packageKey, packageIv);

    // console.log(_token, amount, currentPack)
    // console.log(req.user.wallet_balance)
    // console.log(amount < req.user.wallet_balance)

    const amountNum = Number(amount);
    const balanceNum = Number(req.user.wallet_balance);


    if(amountNum < balanceNum){
      let part1 = Math.floor(10000 + Math.random() * 90000);  // Generates a 4-digit number
      let part2 = Math.floor(10000 + Math.random() * 90000);  // Generates another 4-digit number
      const uniqueCode = `WB-SI-${part1}-${part2}`;
    
      const chargeFromWallet = await ChargeWalletBalance(req._token, uniqueCode, amount)
      if(chargeFromWallet.success){
    

        await createPaidAdvertEntry(req._token, uniqueCode, amount)
        res.cookie('sessionId', uniqueCode, { maxAge: 7 * 24 * 60 * 60 * 1000 });
        return `${process.env.CURRENT_DOMAIN}/paid/${itemId}`
        
      }else{
        return `${process.env.CURRENT_DOMAIN}/dashboard`
      }
    }else{

    
    if(amount <= 2.00 && _token !== 'brand_ad' && _token !== "business_ad"){
        package = "normal_package"
    }else if(amount >= 3.00 && _token !== 'brand_ad' && _token !== "business_ad"){
        package = "boosted_package"
    }else if(amount == 5.00 && _token !== 'brand_ad'){
        package = "normal_package"
    }else if(amount > 5.00 && _token !== 'brand_ad'){
        package = "boosted_package"
    }else if(_token === "brand_ad"){
    //   const {current_pack} = req.body 
      package = currentPack
    }

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
      success_url: `${process.env.CURRENT_DOMAIN}/paid/${itemId}`,
      cancel_url: `${process.env.CURRENT_DOMAIN}/dashboard`,
    });
  
    await createPaidAdvertEntry(req._token, itemId, amount)
  
    res.cookie('sessionId', session.id, { maxAge: 7 * 24 * 60 * 60 * 1000 }); // Cookie valid for 7 days
    // res.cookie("_pay_advert", amount, {maxAge: 1 * 24 * 60 * 60 * 1000 })
    // res.cookie("_pkg", package, {maxAge: 1 * 24 * 60 * 60 * 1000 })
//    console.log(session.url)
    return session.url
  }
  }else{
    return null
  }
}catch(error){
    return error
  }
  }



  module.exports = ChargeForItem