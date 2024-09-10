const createPassword = async (req,res) =>{
    try{
        if(req.cookies._sessionCode){
        const {email, password} = req.body
   
        const response = await fetch(`${process.env.ENDPOINT}/y/create-password`, {
            method:"POST", 
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({email:email, newPassword:password})
        })
        const responseData = await response.json()
        if(responseData.success){
            return res.json({success:"Password Updated sucessfully"})
        }else{
            return res.json({error:responseData.error})
        }
    }else{
        return res.json({error:"Process Mis-match"})
    }
    }catch(error){
        return res.json({error:error.message})
    }
}

module.exports = createPassword