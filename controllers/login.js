const dotenv = require("dotenv").config();
const getCurrencyFromCountryCode = require("./utils/getCurrency")
const getLocationByIP = require("./utils/getLocation")
 const formatTimezoneOffset = require("./utils/formatTimeZone");
const getCallingCodeFromCountryCode = require("./utils/getCallingCodes");

const login = async (req,res) =>{
try{
    const {user, pass} = req.body
        function getClientIP(req) {
        let ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
    
        // Clean IPv6 localhost
        if (ip === '::1') ip = '127.0.0.1';
      
        return ip;
      }
      
      const ip = getClientIP(req)
    
      const location = await getLocationByIP(ip)
      console.log(location.countryCode)
      
    //   req.userLocation = location
      const timeZone = formatTimezoneOffset(location.timezone) || "GMT + 1:00"
      const currency =  await getCurrencyFromCountryCode(location.countryCode) || "SF"
      const callingCode = await getCallingCodeFromCountryCode(location.countryCode) || "+1"

   
      const country = location.country
    const response = await fetch(`${process.env.ENDPOINT}/y/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user, pass, country, location:timeZone, currency, callingCode
        })
    });
 
    const responseData = await response.json(); 
    if(responseData.success){
        // create cookie expiry date 
        const cookieOptions = {
        expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: false
        }
 
        res.cookie("_t", responseData.userToken, cookieOptions)
        res.cookie('_usid', responseData.userId, cookieOptions)
        // res.redirect("/profile")
        return res.json({success:"UserLoggedIn", token:responseData.cookie, message:responseData.success})
    }else{
        return res.json({error:"CouldNotLogin", message:responseData.error})
    }
}catch(error){
    console.log(error)
    res.json({error:error.message, message:error.message})
}
}


module.exports = login