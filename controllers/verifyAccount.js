const verifyAccount = async (req,res) =>{
    const {q} = req.query
    // y/verifyAccount
    try{
        const data = {
            token:q
        }
     
        const response = await fetch(`${process.env.ENDPOINT}/y/verifyAccount`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            } 
        });
    
        const responseData = await response.json(); 
        if(responseData.success){
            res.redirect("/login")
        }else{
            return res.json({error:responseData.error})
        }
    }catch(error){
        return res.json({error:error.message})
    }
}


module.exports = verifyAccount