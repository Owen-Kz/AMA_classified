const dotenv = require("dotenv").config();


const GetBrandInfo = async (req,res) =>{
    try{
    const productId = req.params.id
 
    const data = {
        id:productId,
    }
    const response = await fetch(`${process.env.ENDPOINT}/y/BrandInfo/${productId}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/JSON'
        },
        body: JSON.stringify(data)
    });

    const responseData = await response.json(); 
    if(responseData.success){
        const ProductFiles =  responseData.productFiles
     
        return res.json({success:"ProductDetails", details: responseData.productDetails, productFiles:ProductFiles})
    }else{
        return res.json({error:responseData.message})
    }
}catch(error){
    return res.json({error:error.message})
}

}

module.exports = GetBrandInfo