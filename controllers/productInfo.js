const dotenv = require("dotenv").config();


const GetProductinfo = async (req,res) =>{
    const productId = req.params.id
    const data = {
        id:productId,
    }

    const response = await fetch(`${process.env.ENDPOINT}/y/productInfo/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.query)
    });

    const responseData = await response.json(); 
    if(responseData.success){
        const ProductFiles =  responseData.productFiles
        const subCategories = responseData.subCategories

        return res.json({success:"ProductDetails", details: responseData.productDetails, SubCategories: subCategories, productFiles:ProductFiles})
    }else{
        return res.json({error:responseData.message})
    }

}

module.exports = GetProductinfo