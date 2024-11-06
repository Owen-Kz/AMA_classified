const getAnalytics = async (req,res) =>{
    try{
        
        const response = await fetch(`${process.env.ENDPOINT}/y/getAnalytics`, {
            method:"POST", 
            headers:{
                "Content-Type" : "application/json"
            },
        })
        const responseData = await response.json()
        if(responseData.success){
            return res.json({success:"Analytics", Analytics:responseData.sources})
        }else{
            console.log(responseData.error)
            return res.json({error:responseData.error})
        }
    }catch(error){
        console.log(error)
        return res.json({error:error.message})
    }

}

module.exports = getAnalytics