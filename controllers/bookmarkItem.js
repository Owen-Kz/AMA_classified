const dotenv = require("dotenv").config();
const fs = require('fs');
const axios = require('axios');
const path = require("path");

const addToBookMarks = async (req, res) => {
    if(req.cookies._t){
        const {itemID} = req.body
    const data = {
        item_id: itemID,
        user_id: req.user.id
    };

    try {
        const response = await fetch(`${process.env.ENDPOINT}/y/bookMarkItem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (responseData.success) {
         
           
            return res.json({
                success: responseData.success,
               
            });
        } else {
            return res.json({ error: responseData.error });
        }
    } catch (error) {
        console.log(error.message);
        return res.json({ error: error.message });
    }
}else{
    res.json({error:"userNOtLoggedIn"})
}
};

module.exports = addToBookMarks;
