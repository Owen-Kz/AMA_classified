const dotenv = require("dotenv").config();
const axios = require('axios');

const chatHistory = async (req,res) =>{
        if(req.cookies._t){
        const {roomId} = req.body
        // messageHistory
        try{
   
        const response = await fetch(`${process.env.ENDPOINT}/y/chatHistory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });
        const responseData = await response.json(); 
        if(responseData.success){
            return res.json({success:"messageHistory", messages:responseData.messageHistory})
        }else{
            return res.json({success:"messageHistory", messages:[]})
        }
        }
        catch(error){
            return res.json({error:error.message})
        }
         
        
    }else{
        res.redirect("/login")
    }
}

module.exports = chatHistory