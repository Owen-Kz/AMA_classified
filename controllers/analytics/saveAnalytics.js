const { config } = require("dotenv")

const SaveAnalytics = async (req,res) =>{
    try{
    const source = req.params.source

    const response = await fetch(`${process.env.ENDPOINT}/y/create-analytics`, {
        method:"POST", 
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify({source:source})
    })
    const responseData = await response.json()
    if(responseData.success){
        return res.redirect("/")
    }else{
        return res.json({error:responseData.error})
    }
    }catch(error){
        console.log(error)
        res.redirect("/")
    }

}


module.exports = SaveAnalytics