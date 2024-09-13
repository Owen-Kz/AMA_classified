const getStaticAds = async (req,res) =>{
    try{
        const response = await fetch(`${process.env.ENDPOINT}/y/staticAdverts`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            } 
        });

        const responseData = await response.json(); 

        if(responseData.success){

            return res.json({success:"staticAdverts", adverts:responseData.static_advert})
        }else{
            return res.json({error:responseData.error})
        }
    }catch(error){
        return res.json({error:error.message})
    }
}


module.exports = getStaticAds