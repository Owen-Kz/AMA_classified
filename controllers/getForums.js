const { configDotenv } = require("dotenv");

const getforums = async (req,res) =>{
    if(req.cookies._t){
    
        const response = await fetch(`${process.env.ENDPOINT}/y/forums`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token:req.cookies._t})
        });
        const responseData = await response.json(); 
     
        if(responseData.success){
           return res.json({success:"ForumsData", forums:responseData.forums})
        }else{
          return  res.json({error:responseData.error})
        }
    }else{
       return res.json({error:"InvalidParametersProvided"})
    }
}

module.exports = getforums