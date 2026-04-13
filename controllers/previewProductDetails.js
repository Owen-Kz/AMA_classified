const dotenv = require("dotenv").config();


const PreviewProductDetails = async (id) =>{
    try{
    const productId = id
    const data = {
        id:productId,
    }
    const response = await fetch(`${process.env.ENDPOINT}/y/productInfo/${productId}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/JSON'
        },
        body: JSON.stringify(data)
    });

    const responseData = await response.json(); 
    if(responseData.success){
        const ProductFiles =  responseData.productFiles
        const subCategories = responseData.subCategories
        return responseData.productDetails
    }else{
        return responseData.message
    }
}catch(error){
    return res.json({error:error.message})
}

}

module.exports = PreviewProductDetails