const adminActions = async (req,res)=>{
    if(req.cookies._ama && req.cookies._superID){
        // const uid = req.cookies._superID
        // const response = await fetch(`${process.env.ENDPOINT}/y/allListings/${uid}`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // });
    
        // const responseData = await response.json(); 

        // if(responseData.success){
        //     return res.json({success:responseData.success})
        // }else{
            return res.json({error:"This Page is under Construction"})
        // }
    }else{
        res.json({error:"UnAuthorized"})
    }
}


module.exports = adminActions