const { configDotenv } = require("dotenv");

const CheckForFullPage = async () =>{

    try{
     
        const response = await fetch(`${process.env.ENDPOINT}/y/fullpageAd`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

        });
        const responseData = await response.json(); 
        if(responseData.success){
           return responseData.full_page
        }else{
            return []
        }
        
    }catch(error){
        console.log(error.message)
        return []
    }
}


module.exports = CheckForFullPage