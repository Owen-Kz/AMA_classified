const { configDotenv } = require("dotenv")


const setToExpired = async (userID) =>{
    try{
        
        // if(req.user){
        // const userID = req.user.id
        const response = await fetch(`${process.env.ENDPOINT}/y/setToExpired`, {
            method:"POST", 
            headers:{
                "Content-Type" : "application/json"
            },
            // body:JSON.stringify({user_id:userID, item_id:item_id, amount:amount})
        })
        const responseData = await response.json()
        if(responseData.success){
            console.log(responseData.success)
            return {success:responseData.success}
        }else{
            console.log(responseData.error)
            return {error:responseData.error}
        }
    // }else{
    //     return {error:"Process Mismatch"})
    // }
    }catch(error){
        console.log(error)
        return {error:error.message}
    }
}

module.exports = setToExpired