const { config } = require("dotenv")
const decryptText = require("../utils/decryptText")
const saveWalletTransaction = require("./SaveWalletTransaction")
const updateWalletBalance = require("./updateWalletBalance")
config()
const stripe = require('stripe')(process.env.STRIPE_API_TEST_KEY)

const fundWallet = async (req,res) =>{
    try{
        if(req._token && req.user){
      const {amount} = req.body
      const userId = req.user.id
    
    if(amount){
    
        if(amount < 1){
            return res.json({error:"Amount Cannot be zero"})
        }
    

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Fund Wallet`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CURRENT_DOMAIN}/dashboard`,
      cancel_url: `${process.env.CURRENT_DOMAIN}/home`,
    });
    const userToken = req._token
    const paymentId = session.id
 

    if(paymentId && paymentId != null){
    await saveWalletTransaction(paymentId, userToken, amount)
    // await updateWalletBalance(userToken, paymentId, amount)
    }
  
  
    return res.json({success:"link", url:session.url})
  }else{
    return null
  }
}else{
    return res.json({error:"USer not logged In"})
}
}catch(error){
    return error
  }
  }



  module.exports = fundWallet