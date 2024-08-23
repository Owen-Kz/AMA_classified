const { configDotenv } = require("dotenv");

const CreateForums = async (req,res) =>{
    
    try{
      

    if(req.cookies._t){
        const {topic} = req.body 
        const userId = req.user.id
        const username = req.user.u_name
     
        const forumData = {
        topic:topic,
        userId:userId,
        username:username
        }
        
        const response = await fetch(`${process.env.ENDPOINT}/y/CreateForum`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(forumData)
        });
        const responseData = await response.json(); 
       
        if(responseData.success){

           return res.json({success:responseData.success})
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

module.exports = CreateForums