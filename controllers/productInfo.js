const GetProductinfo = async (req,res) =>{
    const productId = req.params.id
    const data = {
        id:productId,
    }

    const response = await fetch(`https://ama-endpoint.onrender.com/y/productInfo/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.query)
    });

    const responseData = await response.json(); 
    if(responseData.success){
        return res.json({success:"ProductDetails", details: responseData.productDetails})
    }else{
        return res.json({error:responseData.message})
    }

}

module.exports = GetProductinfo