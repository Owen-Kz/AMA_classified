const { configDotenv } = require("dotenv");

const getcomments = async (req,res) =>{
    const {id} = req.body
   
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
        const response = await fetch(`${process.env.ENDPOINT}/y/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token:ValidToken,  forumID:id})
        });
        const responseData = await response.json(); 
     
        if(responseData.success){
           return res.json({success:"commentsData", comments:responseData.comments})
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

module.exports = getcomments