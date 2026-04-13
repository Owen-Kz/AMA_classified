const { configDotenv, config } = require("dotenv")

const userListings = async (req,res) =>{
    try{
    const {uid, page} = req.body
    const data = {
        page: page,
        uid:uid
    }
  
    if(uid){
        const response = await fetch(`${process.env.ENDPOINT}/y/userListings/${uid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    
        const responseData = await response.json(); 

        if(responseData.success){
            return res.json({success:"userListings", mylistings:responseData.listings, currentPage:responseData.pageCount,
                totalPagesListing: responseData.totalCount})
        }else{
            return res.json({error:"Could Not retrieve Listings for this user"})
        }
    }else{
        return res.json({error:"Incomplete Parameters Provided"})
    }
}catch(error){
    return res.json({error:error.message})
}
}

module.exports = userListings