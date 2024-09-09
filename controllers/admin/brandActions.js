const BrandActions = async (req,res)=>{
    try{
    if(req.cookies._ama && req.cookies._superID){
        const action  = req.params.action
        const itemId = req.params.id 
    
        const uid = req.cookies._superID
       const data = {
            action:action,
            itemID: itemId
        } 
        const response = await fetch(`${process.env.ENDPOINT}/y/action/brand/${uid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    
        const responseData = await response.json(); 

        if(responseData.success){
            return res.json({success:responseData.success})
        }else{
            return res.json({error:responseData.error})
        }
    }else{
        res.json({error:"UnAuthorized"})
    }
}catch(error){
    return res.json({error:error.message})
}
}


module.exports = BrandActions