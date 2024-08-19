const listingFiles = async (req, res) =>{
    const productId = req.params.id
    const data = {
        id:productId,
    }
    try{
    const response = await fetch(`${process.env.ENDPOINT}/y/getProductFiles`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/JSON'
        },
        body: JSON.stringify(data)
    });

    const responseData = await response.json(); 
    
    if(responseData.success){
        const ProductFiles =  responseData.productFiles
       
        return res.json({success:"ProductDetails", productFiles:ProductFiles})
    }else{
        return res.json({error:responseData.message})
    }
}catch(error){
    console.log(error.message)
}
}


module.exports  = listingFiles