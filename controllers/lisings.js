const dotenv = require("dotenv").config();

const listings = async (req,res) =>{
const dotenv = require("dotenv").config();

    const data = {
        page : req.query.page || 1
    }
    try{ 
        
    const response = await fetch(`${process.env.ENDPOINT}/y/allListings`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const responseData = await response.json(); 

    

    if(responseData.success){
        return res.json({success:responseData.success, listings:responseData.listings, currentPage:responseData.pageCount,
            totalPagesListing: responseData.totalCount})
    }else{
        return res.json({error:responseData.error})
    }
}catch(error){
    return res.json({error:error})
}
}


module.exports = listings