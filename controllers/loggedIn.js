const { configDotenv } = require("dotenv")

const LoggedIN = async (req,res, next) =>{
    const userToken = req.cookies._t
    const emptyArray = {
        id: "2209102",
        u_name: "",
        email: "",
        name: "",
        phone:"",
        l_name:"",            
    }

    if(userToken){
    const data = {
        token: userToken
    }
    const response = await fetch(`${process.env.ENDPOINT}/y/loggedIn`, {
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
  
        req.user = emptyArray
        next()
    }
}else{
    req.user = emptyArray
    next()
}
}

module.exports = LoggedIN