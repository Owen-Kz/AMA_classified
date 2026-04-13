const { configDotenv } = require("dotenv")

const AdminLoggedIn = async (req,res, next) =>{
    try{
    const userToken = req.cookies._ama
    if(userToken){
    const data = {
        token: userToken
    }
    const response = await fetch(`${process.env.ENDPOINT}/y/admin/loggedIn`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const responseData = await response.json(); 

    if(responseData.user){
        req.user = responseData.user
        
        next()
        // return response.user
    }else{
  
        req.user = []
        next()
    }
}else{
    req.user = []
    next()
}
    }catch(error){
        res.json({error:error})
    }
}

module.exports = AdminLoggedIn