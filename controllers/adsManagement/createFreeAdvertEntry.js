


const { configDotenv } = require("dotenv")


const createFreeAdvertEntry = async (userID, item_id) =>{
    try{
        
        // if(req.user){
        // const userID = req.user.id
        const response = await fetch(`${process.env.ENDPOINT}/y/createFreeAdvert`, {
            method:"POST", 
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({user_id:userID, item_id:item_id})
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

module.exports = createFreeAdvertEntry