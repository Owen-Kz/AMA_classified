const dotenv = require("dotenv").config();
const axios = require('axios');

const countAdminListings = async (req,res) =>{
    const admin = req.cookies._ama
    if(admin){
    try {
       
        const response = await fetch(`${process.env.ENDPOINT}/y/countAdminListings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId:req.cookies._superID})
        });

        const responseData = await response.json();

        if (responseData.success) {
   
            // Process listings in batches until the `withPictures` array is filled
            return res.json({
                success: responseData.success,
                total: responseData.totalListings,
                awaitingApproval: responseData.totalawatingApproval,
                active: responseData.totalActive,
                allUsers: responseData.totalUsers
            });
        } else {
            console.log(responseData.error)
            return res.json({ error: responseData.error });
        }
    } catch (error) {
        console.log(error.message);
        return res.json({ error: error.message });
    }
}else{
    return res.json({error:"Unathorized USer"})
}

}

module.exports = countAdminListings