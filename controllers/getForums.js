const { configDotenv } = require("dotenv");

const getforums = async (req,res) =>{
    const admin = req.cookies._ama 
    const user = req.cookies._t 
    let ValidToken = ""

    if(admin){
       ValidToken = admin
    }else if(user){
       ValidToken = user
    }
   if(ValidToken !== ""){
    
        const response = await fetch(`${process.env.ENDPOINT}/y/forums`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token:ValidToken})
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