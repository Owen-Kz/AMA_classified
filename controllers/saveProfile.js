const { json } = require("body-parser")
const { configDotenv } = require("dotenv")

const saveProfile = async(req,res) =>{
    try {
    if(req.cookies._t){
    const field = req.params.field
    const value = req.params.value
    const userId = req.user.id 
    const data = {
        u_id: userId, 
        field:field,
        value:value
    } 

        const response = await fetch(`${process.env.ENDPOINT}/y/saveProfile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        
        if (responseData.success) {
          res.json({success:responseData.success})
          
        }else{
            res.json({error:responseData.error})
        }

    }else{
        res.json({error:"InvalidParametersProvided"})
    }
}catch(error){
    res.json({error:error.message})
}
}

module.exports = saveProfile