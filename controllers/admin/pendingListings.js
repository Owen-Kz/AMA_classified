const { configDotenv, config } = require("dotenv")

const Pending = async (req,res) =>{
    const {uid, page} = req.body
    const data = {
        page: page,
        uid:uid
    }
    if(uid){
        const response = await fetch(`${process.env.ENDPOINT}/y/pendingListings/${uid}`, {
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
}

module.exports = Pending