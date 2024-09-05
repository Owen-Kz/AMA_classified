const dotenv = require("dotenv").config();

const login = async (req,res) =>{
try{
    const response = await fetch(`${process.env.ENDPOINT}/y/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
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
    res.json({error:error})
}
}


module.exports = login