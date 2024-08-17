const dotenv = require("dotenv").config();
const axios = require('axios');

const countMyListings = async (req,res) =>{
    try {
        const response = await fetch(`${process.env.ENDPOINT}/y/countMyListings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId:req.user.id})
        });

        const responseData = await response.json();

        if (responseData.success) {
   
            // Process listings in batches until the `withPictures` array is filled
            return res.json({
                success: responseData.success,
                total: responseData.totalListings,
                pending: responseData.totalPending,
                active: responseData.totalActive,
                soldout: responseData.totalSoldout
            });
        } else {
            console.log(responseData.error)
            return res.json({ error: responseData.error });
        }
    } catch (error) {
        console.log(error.message);
        return res.json({ error: error.message });
    }
}

module.exports = countMyListings