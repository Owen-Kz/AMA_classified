const { configDotenv } = require("dotenv");

const getAnnouncements = async (req,res) =>{
    if(req.cookies._t){
        const response = await fetch(`${process.env.ENDPOINT}/y/announcements`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token:req.cookies._t})
        });
        const responseData = await response.json(); 
     
        if(responseData.success){
           return res.json({success:"AnnoucementsData", announcements:responseData.announcements})
        }else{
          return  res.json({error:responseData.error})
        }
    }else{
       return res.json({error:"InvalidParametersProvided"})
    }
}

module.exports = getAnnouncements