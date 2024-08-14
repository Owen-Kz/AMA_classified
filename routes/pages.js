const express = require("express");
const axios = require('axios');
const listings = require("../controllers/lisings");
const login = require("../controllers/login");
const GetProductinfo = require("../controllers/productInfo");
const router = express.Router();
router.use(express.json());
const endpoint = 'https://ama-endpoint.onrender.com/y/'

router.get("/", (req,res) =>{
    res.render("home")
})
router.get("/register", (req,res) =>{
    res.render("register")
})
router.get("/login", (req,res) =>{
    res.render("login")
})

router.get("/l/:productTitle/:id", async (req,res) =>{
    res.render("preview.ejs", {title:req.params.productTitle})
})
router.get("/details/:productTitle/:id", GetProductinfo)

router.post("/signup", async (req,res) =>{
    const { username, password, country, firstname, lastname, phonenumber, email } = req.body;

    // Prepare the data to send in the POST request
    const data = {
        username: username,
        password: password,
        email: email,
        firstname: firstname, 
        lastname: lastname,
        phonenumber: phonenumber,
        country, country
    };
    console.log(endpoint)

    try {
        // Make the POST request to another endpoint
        const response = await fetch(`https://ama-endpoint.onrender.com/y/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        const responseData = await response.json();
        // console.log(responseData)
        // Handle the response from the external endpoint
        if(responseData.error){
            res.json({
                message: responseData.error,
                externalResponse: responseData
            });
        }else{
            res.json({
                success: responseData.success,
                message: 'User registered successfully!',
                externalResponse: responseData
            });
        }
     
    } catch (error) {
        console.log(error)
        // Handle any errors that occur during the request
        res.status(500).json({
            message: 'Error registering user',
            error: error.message
        });
    }
})

router.get('/listings',(req,res)=>{
    res.render("listings")
})
router.post("/listings", listings)

router.post("/login", login)

router.get("*", (req, res)=> {
    res.redirect('/')
})
module.exports = router