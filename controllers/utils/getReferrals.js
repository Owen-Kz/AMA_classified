const getReferrals = async (req,res) =>{
// " 
try{
    if(req.user){
        
        const response = await fetch(`${process.env.ENDPOINT}/y/getReferrals`, {
            method:"POST", 
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({referralID:req.user.referral_code})
        })
        const responseData = await response.json()
        if(responseData.success){

            return res.json({success:"referrals available", referrals:responseData.referrals})
        }else{
            return res.json({error:responseData.error})
        }
    }else{
        return res.json({error:"User not Logged in"})
    }
}catch(error){
    res.json({error:error})
}
}

module.exports = getReferrals