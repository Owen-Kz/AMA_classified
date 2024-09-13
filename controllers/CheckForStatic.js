const { configDotenv } = require("dotenv");

const CheckForStaticAdvert = async () =>{

    try{
     
        const response = await fetch(`${process.env.ENDPOINT}/y/staticAdverts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const responseData = await response.json(); 
        if(responseData.success){
           return responseData.static_advert
        }else{
            return []
        }
        
    }catch(error){
        console.log(error.message)
        return []
    }
}


module.exports = CheckForStaticAdvert