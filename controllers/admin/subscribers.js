const { configDotenv, config } = require("dotenv")

const subscribers = async (req,res) =>{
    const {uid, page} = req.body
    const data = {
        page: page,
        uid:uid
    }
    if(uid){
        const response = await fetch(`${process.env.ENDPOINT}/y/admin/subsribers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    
        const responseData = await response.json(); 
   
        if(responseData.success){
            return res.json({success:"subscribers", subscribers:responseData.subscribers, currentPage:responseData.pageCount,
                totalPagessubscribers: responseData.totalCount})
        }else{
            return res.json({error:"Could Not retrieve subscribers"})
        }
    }else{
        return res.json({error:"Incomplete Parameters Provided"})
    }
}

module.exports = subscribers