const { configDotenv } = require("dotenv");

const getAnnouncements = async (req,res) =>{
   try{
     const admin = req.cookies._ama 
     const user = req.cookies._t 
     let ValidToken = ""

     if(admin){
        ValidToken = admin
     }else if(user){
        ValidToken = user
     }
    if(ValidToken !== ""){
        const response = await fetch(`${process.env.ENDPOINT}/y/announcements`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token:ValidToken})
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
   }catch(error){
      return res.json({error:error.message})
   }
}

module.exports = getAnnouncements