const express = require("express");
const axios = require('axios');
const listings = require("../controllers/lisings");
const login = require("../controllers/login");
const dotenv = require("dotenv").config();
const GetProductinfo = require("../controllers/productInfo");
const constants = require("../controllers/constants");
const LoggedIN = require("../controllers/loggedIn");
const userListings = require("../controllers/userListings");
const CarryAction = require("../controllers/carryAction");
const previewItem = require("../controllers/previewItem");
const router = express.Router();

router.use(express.json());
const endpoint = `${process.env.ENDPOINT}/`



router.get("/", LoggedIN, (req,res) =>{
    if(req.cookies._t){
        res.render("home", {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id})
    }else{
    res.render("home", {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id})

    }
})


router.get("/register", (req,res) =>{
    res.render("register")
})
router.get("/login", (req,res) =>{
    res.render("login")
})

router.get("/l/:productTitle/:id",LoggedIN, previewItem)
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
        const response = await fetch(`${process.env.ENDPOINT}/y/register`, {
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


router.get("/dashboard", LoggedIN, (req,res) => {
    if(req.cookies._t){
        res.render("dashboard", {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id})
    }else{
        res.redirect("/login")
    }
})

router.get("/profile", LoggedIN, (req,res) =>{
    if(req.cookies._t){
    res.render("profile",  {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id, facebook:req.user.fb, twitter:req.user.twitter, flickr:req.user.flickr, instagram:req.user.insta, youtube:req.user.ytube, vimeo:req.user.vimeo, behance:req.user.behance, linkedin: req.user.linkd, website:req.user.web})
}else{
    res.redirect("/login")
}
})

router.get("/announcements",LoggedIN, (req,res)=>{
    if(req.cookies._t){
        res.render("announcements",  {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id, facebook:req.user.fb, twitter:req.user.twitter, flickr:req.user.flickr, instagram:req.user.insta, youtube:req.user.ytube, vimeo:req.user.vimeo, behance:req.user.behance, linkedin: req.user.linkd, website:req.user.web})
    }else{
        res.redirect("/login")
    }
})

router.get("/messages", (req,res) =>{
    res.render("messages")
})

router.get('/bookmarks',LoggedIN, (req,res)=>{
    if(req.cookies._t){
    res.render('bookmarks', {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id})
    }else{
        res.redirect("/login")
    }
})

// render listings page 
router.get("/mylistings", LoggedIN, (req,res) =>{
    if(req.cookies._t){

    res.render("mylistings", {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id})
    }else{
        res.redirect("/login")
    }
})
// get Listings for user 
router.post("/userListings", userListings)


// Item Actions 
router.get("/:do/item/:id", LoggedIN, CarryAction)


router.get("/Logout", (req,res) => {
    res.clearCookie('_t')
    res.clearCookie("_usid")
    res.redirect("/")
})
router.get("*", (req, res)=> {
    res.redirect('/')
})
module.exports = router