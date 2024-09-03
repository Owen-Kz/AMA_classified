const { configDotenv } = require("dotenv");

const fullpageAd = async (req,res) =>{
    try{
    const response = await fetch(`${process.env.ENDPOINT}/y/fullpageAd`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const responseData = await response.json(); 
    if(responseData.success){
        return res.json({success:"FullPage Ad", fullpageAd:responseData.full_page})
    }else{
        return res.json({error:responseData.error})
    }
}catch(error){
    return res.json({error:error})
}
    
}


module.exports = fullpageAd