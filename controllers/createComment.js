const { configDotenv } = require("dotenv");

const CreateComments = async (req,res) =>{
    
    try{
      

    if(req.cookies._t){
        const {id, comment} = req.body 
        const userId = req.user.id
        const username = req.user.u_name
     
        const commenetData = {
        topicId: id,
        comment: comment,
        user_id: userId,
        username: username
        }
        
        const response = await fetch(`${process.env.ENDPOINT}/y/CreateComment`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(commenetData)
        });
        const responseData = await response.json(); 
        console.log(responseData)
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

module.exports = CreateComments