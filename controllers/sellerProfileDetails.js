const { configDotenv } = require("dotenv");

const SellerProfileDetails = async (req,res) =>{
    const {u_id} = req.body
    const data = {
        id:u_id,
    }

    const response = await fetch(`${process.env.ENDPOINT}/y/sellerInfo/`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        } 
    });

    const responseData = await response.json(); 
    if(responseData.success){
        res.json({success:"sellerDetails", sellerDetails:responseData.user})
    }else{
        res.json({error:responseData.error})
    }
}


module.exports = SellerProfileDetails