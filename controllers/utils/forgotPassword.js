const { configDotenv } = require("dotenv")

const forgotPassword = async (req,res) =>{
    try{
        const {email} = req.body
        const response = await fetch(`${process.env.ENDPOINT}/y/forgot-password`, {
            method:"POST", 
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({email:email})
        })
        const responseData = await response.json()
        if(responseData.success){
            res.cookie("_user", email, { maxAge: 1 * 24 * 60 * 60 * 1000 })
            res.redirect("/verifyCode")
            // return res.json({success:"Password Reset Code has been sent"})
        }else{
            return res.json({error:responseData.error})
        }
    }catch(error){
        return res.json({error:error.message})
    }
}

module.exports = forgotPassword