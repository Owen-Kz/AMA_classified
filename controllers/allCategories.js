const { configDotenv } = require("dotenv")

const AllCategories = async (req,res) =>{
    try{
    const response = await fetch(`${process.env.ENDPOINT}/y/allCategories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:"amaslink@gmail.com"})
    }); 

    const responseData = await response.json(); 
    if(responseData.success){
     
        return res.json({success:"allCategories", categories:responseData.allCategories})
    }else{
        return res.json({error:"Could Not retrieve Categories"})
    }
}catch(error){
    return res.json({error:error.message})
}
}
module.exports = AllCategories