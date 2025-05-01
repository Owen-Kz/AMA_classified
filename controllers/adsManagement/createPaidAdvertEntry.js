const { configDotenv } = require("dotenv")


const createPaidAdvertEntry = async (userID, item_id, amount) =>{
    try{
        
        // if(req.user){
        // const userID = req.user.id
        const response = await fetch(`${process.env.ENDPOINT}/y/createPaidAdvertEntry`, {
            method:"POST", 
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({token:userID, item_id:item_id, amount:amount})
        })
        const responseData = await response.json()
        if(responseData.success){
            return {success:responseData.success}
        }else{
            return {error:responseData.error}
        }
    // }else{
    //     return {error:"Process Mismatch"})
    // }
    }catch(error){
        return {error:error.message}
    }
}

module.exports = createPaidAdvertEntry