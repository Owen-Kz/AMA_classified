const { configDotenv } = require("dotenv");


const adminLogin = async (req,res) =>{

    const response = await fetch(`${process.env.ENDPOINT}/y/admin/login`, {
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
        res.cookie("_ama", responseData.userToken, cookieOptions)
        res.cookie('_superID', responseData.userId, cookieOptions)
        res.cookie('_usid', responseData.userId, cookieOptions)
        // res.redirect("/profile")
        return res.json({success:"UserLoggedIn", token:responseData.cookie, message:responseData.success})
    }else{
        return res.json({error:"CouldNotLogin", message:responseData.error})
    }

}


module.exports = adminLogin