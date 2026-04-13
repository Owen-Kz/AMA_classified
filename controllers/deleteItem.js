const DeleteItem = async (req,res) =>{
    const {item_id} = req.body
    
    if(req.cookies._t){
        try{
            const userId = req.user.id
            const data = {
                userId: userId, 
                itemId: item_id
            }
        
            const response = await fetch(`${process.env.ENDPOINT}/y/DeleteItem`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        
            const responseData = await response.json(); 
            if(responseData.success){
                res.json({success:responseData.success})
            }else{
                res.json({error:responseData.error})
            }
    }catch(error){
        res.json({error:error})
    }

    }else{
        res.json({error:"NotLoggedIn"})
    }
}

module.exports = DeleteItem