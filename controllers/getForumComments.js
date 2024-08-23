const { configDotenv } = require("dotenv");

const getcomments = async (req,res) =>{
    const {id} = req.body
   
    try{
    if(req.cookies._t){
        const response = await fetch(`${process.env.ENDPOINT}/y/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token:req.cookies._t,  forumID:id})
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