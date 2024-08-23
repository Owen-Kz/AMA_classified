const opentToView = async(req,res, next) =>{
    const productTitle = req.params.productTitle
    const productId = req.params.id
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const sessionId = req.sessionID;

if(productTitle && productId){
    try{
    const data = {
        item_id: productId,
        userIp: ip,
        browserAgent:userAgent,
        sessionId:sessionId,
        productTitle:productTitle,
        userId:req.user.id
    }
    const response = await fetch(`${process.env.ENDPOINT}/y/viewItem`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const responseData = await response.json(); 
    if(responseData.success){
        next()
    }
    else{
        console.log(responseData.error)
        next()
    }
}catch(error){
    console.log(error.message)
}
}
}
 

module.exports = opentToView