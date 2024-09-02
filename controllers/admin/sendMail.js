const { configDotenv } = require("dotenv");

const sendMail = async (req,res) =>{
    const {to, subject, message} = req.body

    if(req.cookies._superID && req.cookies._ama){
    const data = {
        a_id: req.cookies._superID,
        to:to,
        subject:subject, 
        message:message 
    }
    const response = await fetch(`${process.env.ENDPOINT}/y/admin/sendMail`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const responseData = await response.json();
  
    if(responseData){
        if(responseData.success){
            return res.json({success:responseData.success})
        }else if(responseData.error){
            return res.json({error: responseData.error})
        }
    }else{
        return res,json({error:"Could Not Fetch Data"})
    }
    }else{
        res.json({error:"Invalid Token Provided for admin"})
    }
}


module.exports = sendMail