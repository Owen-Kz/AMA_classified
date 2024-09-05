const { configDotenv } = require("dotenv");

const AllUsers = async (req,res) =>{
    if(req.cookies._ama && req.cookies._superID){
    try{
        const data = {
            uid:req.cookies._superID
        }
        const response = await fetch(`${process.env.ENDPOINT}/y/allUsers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const responseData = await response.json(); 
        if(responseData.success){
            return res.json({success:"Users", users:responseData.users})
        }else{
            return res.json({error:responseData.error})
        }
    }catch(error){
        console.log(error)
        return res.json({error:error})
    }
}else{
    return res.json({error:"Usere Not Logged In As Admin"})
}
}


module.exports = AllUsers