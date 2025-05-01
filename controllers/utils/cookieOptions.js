const { configDotenv } = require("dotenv")

 // create cookie expiry date 
 const cookieOptions = {
    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    httpOnly: true
}


const GetCookieOptions = async () =>{
    return cookieOptions
}


module.exports = GetCookieOptions