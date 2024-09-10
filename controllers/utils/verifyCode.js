const { configDotenv } = require("dotenv")

const verifyCode = async (req,res) =>{
    try{
        if(req.cookies._user){
        const {email, code} = req.body
        const response = await fetch(`${process.env.ENDPOINT}/y/verifyCode`, {
            method:"POST", 
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({email:email, token:code})
        })
        const responseData = await response.json()
        if(responseData.success){
           
            res.cookie('_sessionCode', responseData.sessionCode, { maxAge: 1 * 24 * 60 * 60 * 1000 });
            return res.json({success:"Code Verified Succesfully, Proceed to create a new password"})
        }else{
            return res.json({error:responseData.error})
        }
    }else{
        return res.json({error:"Process Mismatch"})
    }
    }catch(error){
        return res.json({error:error.message})
    }
}

module.exports = verifyCode