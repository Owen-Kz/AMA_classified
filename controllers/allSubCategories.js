const { configDotenv } = require("dotenv")

const AllSubCategories = async (req,res) =>{

    const response = await fetch(`${process.env.ENDPOINT}/y/allSubCategories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:"amaslink@gmail.com"})
    }); 

    const responseData = await response.json(); 
    if(responseData.success){
     
        return res.json({success:"allCategories", categories:responseData.allSubCategories})
    }else{
        return res.json({error:"Could Not retrieve Categories"})
    }
}
module.exports = AllSubCategories