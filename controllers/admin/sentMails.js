const { configDotenv } = require("dotenv");

const sentMail = async (req,res) =>{
    try{
    if(req.cookies._superID && req.cookies._ama){
    const data = {
        uid: req.cookies._superID,
    }
    const response = await fetch(`${process.env.ENDPOINT}/y/admin/sentMail`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const responseData = await response.json();
  
    if(responseData){
        if(responseData.success){
         
            return res.json({success:"Emails", emailList:responseData.emailList})
        }else{
            return res.json({error:responseData.error})
        }
    }else{
        return res.json({error:"Coiuld Not fetch Endpoint"})
    }
    }else{
        res.json({error:"Invalid Token Provided for admin"})
    }
}catch(error){
    return res.json({error:error.message})
}
}


module.exports = sentMail