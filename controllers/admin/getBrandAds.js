const { configDotenv, config } = require("dotenv")

const AllBrandAds = async (req,res) =>{
    try{
    const {uid, page} = req.body
    const data = {
        page: page,
        uid:uid
    }
    if(uid){
        const response = await fetch(`${process.env.ENDPOINT}/y/AllBrandAds/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    
        const responseData = await response.json(); 

        if(responseData.success){
            return res.json({success:"BrandAds", BrandAds:responseData.BrandAds, currentPage:responseData.pageCount,
                totalPagesBrandAds: responseData.totalCount})
        }else{
            return res.json({error:"Could Not retrieve BrandAds for this user"})
        }
    }else{
        return res.json({error:"Incomplete Parameters Provided"})
    }
}catch(error){
    console.log(error)
    return res.json({error:error.message})
}
}

module.exports = AllBrandAds