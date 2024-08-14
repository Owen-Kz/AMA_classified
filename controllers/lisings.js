const listings = async (req,res) =>{
    const data = {
        page : req.query.page || 1
    }
    const response = await fetch(`https://ama-endpoint.onrender.com/y/allListings`, {
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
}


module.exports = listings