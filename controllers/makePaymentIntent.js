const paymentintent = async (req,res) =>{
    try{
   
        const {amount, currency} = req.body
      
        if(req.cookies._t) {
            const data = {
                amount:amount,
                currency: currency,
                token:req.cookies._t,
                uid:req.user.id
            }
            const response = await fetch(`${process.env.ENDPOINT}/y/makePayments`, {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const responseData = await response.json()
      
            if(responseData.success){
             
                return res.json({success:"Client Secret", clientSecret:responseData.clientSecret})
            }else{
                console.log(responseData.error)
                return res.json({error:responseData.error})
            }
        }else{
            console.log("NotLoggedIN")
           return res.json({error:"User not loggedIn"})
        }

    }catch(error){
        console.log(error)
        return res.json({error:error.message})
    }
}

module.exports = paymentintent