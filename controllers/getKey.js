const { configDotenv } = require("dotenv");

const getKeys = async (req,res) =>{
    try{
        if(req.cookies_t){
        const response = await fetch(`${process.env.ENDPOINT}//y/getClientKey`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token:req.cookies_t})
        });
        const responseData = await response.json(); 

        if(responseData.success){
            return res.json({success:responseData.success, k:responseData.k})
        }else{
            return res.json({error:responseData.error})
        }
    }else{
        return res.json({error:"User Not Logged In"})
    }
    }catch(error){
        return res.json({error:error.message})
    }
}


module.exports = getKeys