// const { configDotenv } = require("dotenv")


// const checkPaidAds = async (req,res) =>{
//     try{
//         if(req.cookies._user){
//         const userID = req.user.id
//         const response = await fetch(`${process.env.ENDPOINT}/y/checkPaidAds`, {
//             method:"POST", 
//             headers:{
//                 "Content-Type" : "application/json"
//             },
//             body:JSON.stringify({user_id:userID})
//         })
//         const responseData = await response.json()
//         if(responseData.success){
//             return res.json({success:responseData.success})
//         }else{
//             return res.json({error:responseData.error})
//         }
//     }else{
//         return res.json({error:"Process Mismatch"})
//     }
//     }catch(error){
//         return res.json({error:error.message})
//     }
// }

// module.exports = checkPaidAds