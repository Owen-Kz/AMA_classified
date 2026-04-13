const { configDotenv } = require("dotenv");

const SubscribeToNewsLetter = async (req,res) =>{
    try{
    const {name, email} = req.body 
  
    if(name && email){
        const data = {
            name: name, 
            email: email,
        }
        
        const response = await fetch(`${process.env.ENDPOINT}/y/subscribe/`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            } 
        });
    
        const responseData = await response.json(); 
        if(responseData.success){
            return res.json({success:responseData.success})
        }else{
            return res.json({error:responseData.error})
        }
    }
    }catch(error){
        return res.json({error:error.message})
    }
}

module.exports = SubscribeToNewsLetter