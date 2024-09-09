const sponsoredAdverts = async (req,res) =>{
    try{
        const response = await fetch(`${process.env.ENDPOINT}/y/sponsoredAdverts`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            } 
        });

        const responseData = await response.json(); 
        if(responseData.success){
            return res.json({success:"SponsoredAdverts", adverts:responseData.sponsored_ads})
        }else{
            return res.json({error:responseData.error})
        }
    }catch(error){
        return res.json({error:error.message})
    }
}


module.exports = sponsoredAdverts