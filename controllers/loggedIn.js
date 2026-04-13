const { configDotenv } = require("dotenv")



const LoggedIN = async (req,res, next) =>{
    try{
    const userToken = req.cookies._t
    const emptyArray = {
        id: "2209102",
        u_name: "",
        email: "",
        name: "",
        phone:"",
        l_name:"",
        location:"",
        currency: "",
        country:"",            
    }

    if(userToken){
        
    const data = {
        token: userToken,
        country: "req.userLocation",
        currency: "req.currency",
        location:"req.timeZone"
    }

    const response = await fetch(`${process.env.ENDPOINT}/y/loggedIn`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if(response){
    const responseData = await response.json(); 
if(responseData){

    if(responseData.user){
        
        req.user = responseData.user
        req._token = userToken
        req.current_rates = responseData.CurrencyRate

    

        next()
        // return response.user
    }else{
  
        req.user = emptyArray
        res.current_rates = {
            currency : "USD",
            current_rate: "1",
            country: "USA"
        }
        next()
    }
}else{
    res.json({error:"No Data Provided From response"})
}
}else{
    res.json({error:"could Not fetch Endpoint"})
}

}else{
    req.user = emptyArray
    next()
}
    }catch(error){
        return res.json({errror:error.message})
    }
}

module.exports = LoggedIN