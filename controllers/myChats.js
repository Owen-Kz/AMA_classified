const { configDotenv } = require("dotenv");

const MyChats = async (req,res) =>{
    const userId = req.user.id 
    try{
        const response = await fetch(`${process.env.ENDPOINT}/y/chatList`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user:userId})
        }); 
    
        const responseData = await response.json(); 
        if(responseData.success){
        
            return res.json({success:"allChats", chatList:responseData.allChats})
        }else{
            return res.json({error:responseData})
        }
    }
    catch(error){
        console.log(error.message)
    }
}


module.exports = MyChats