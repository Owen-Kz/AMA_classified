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
const SellerProfileDetails = require("../controllers/sellerProfileDetails");
const categories = require("../controllers/categories");
const AllCategories = require("../controllers/allCategories");
const fs = require('fs');
const path = require("path");
const bookmarks = require("../controllers/bookmarks");
const countMyListings = require("../controllers/countMyListings");
const listingFiles = require("../controllers/listingFiles");
const MyChats = require("../controllers/myChats");
const chatHistory = require("../controllers/chatHistory");
const adsPacksPage = require("../controllers/adsPacksPage");
const markAsSold = require("../controllers/marksAsSold");
const DeleteItem = require("../controllers/deleteItem");
const addToBookMarks = require("../controllers/bookmarkItem");
const ViewsCount = require("../controllers/viewsCount");
const opentToView = require("../controllers/openToView");
const getAnnouncements = require("../controllers/getAnnouncements");
const SellerProfile = require("../controllers/sellerProfile");
const saveProfile = require("../controllers/saveProfile");
const getforums = require("../controllers/getForums");
const getcomments = require("../controllers/getForumComments");
const CreateComments = require("../controllers/createComment");
const CreateForums = require("../controllers/createForum");
const adminLogin = require("../controllers/admin/login");
const AdminLoggedIn = require("../controllers/admin/loggedIn");
const adminDashboard = require("../controllers/admin/dashboard");
const countAdminListings = require("../controllers/admin/counItems");
const CreateAnnoucements = require("../controllers/admin/createAnnoucements");
const AllListingsPage = require("../controllers/admin/allListginsPage");
const adminForum = require("../controllers/admin/forum");
const AllListings = require("../controllers/admin/allListings");
const signup = require("../controllers/signup");
const adminActions = require("../controllers/admin/actions");
const Pending = require("../controllers/admin/pendingListings");
const auctionsPage = require("../controllers/auctionsPage");
const pendingPage = require("../controllers/admin/pendigPage");
const Members = require("../controllers/admin/members");
const ItemsInCategory = require("../controllers/itemsInCategory");
const AnnoucePage = require("../controllers/admin/announcementPage");
const EmailPage = require("../controllers/admin/emailPage");
const AllUsers = require("../controllers/admin/allUsers");
const createAdPage = require("../controllers/createAdPage");
const AllSubCategories = require("../controllers/allSubCategories");
const postAd = require("../controllers/postAd");
const getTransactions = require("../controllers/admin/getAllTransactions");
const transactionsPage = require("../controllers/admin/transactionsPage");
const sendMail = require("../controllers/admin/sendMail");
const sentMail = require("../controllers/admin/sentMails");
const fullpageAd = require("../controllers/fullPageAd");
const SubscribeToNewsLetter = require("../controllers/subscribeToNewsLetter");
const subscribers = require("../controllers/admin/subscribers");
const subscribersPage = require("../controllers/admin/subscribersPage");
const BrandAdsPage = require("../controllers/admin/brandAds");
const AllBrandAds = require("../controllers/admin/getBrandAds");
const BrandActions = require("../controllers/admin/brandActions");
const GetBrandInfo = require("../controllers/admin/getBrandInfo");
const brandPreviewPage = require("../controllers/brandPreviewPage");
const sponsoredAdverts = require("../controllers/sponsoredAds");
const verifyAccount = require("../controllers/verifyAccount");
const getKeys = require("../controllers/getKey");

const paymentintent = require("../controllers/makePaymentIntent");
const charge = require("../controllers/charge");
const paidAdvertPage = require("../controllers/paidAdvertPage");
const forgotPassword = require("../controllers/utils/forgotPassword");
const verifyCode = require("../controllers/utils/verifyCode");
const createPassword = require("../controllers/utils/createPassword");
const sponsoredAdvertPage = require("../controllers/specialAdverts/sponsoredAdvertPage");
const FullPageAdvertPage = require("../controllers/specialAdverts/fullPageAdvertPage");
const StaticAdvertPage = require("../controllers/specialAdverts/staticAdvertPage");
const slideshowAdvertPage = require("../controllers/specialAdverts/slideshowAdvertPage");
const PostBrandAd = require("../controllers/postBrandAd");
const getStaticAds = require("../controllers/specialAdverts/getStaticAds");
const getSlideShowAdverts = require("../controllers/specialAdverts/getSlideshowAdvert");
const postFullpageAd = require("../controllers/postFullPageAdvert");
const fullpageActions = require("../controllers/admin/fullpageActions");
const updateItem = require("../controllers/specialAdverts/updateItem");
const UpdateAdvert = require("../controllers/updateAdvert");
const UpdateProfileImage = require("../controllers/updateProfileImage");

const router = express.Router();

router.use(express.json());



router.get("/", LoggedIN, (req,res) =>{
    if(req.cookies._t){
        res.render("home", {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id})
    }else{
    res.render("home", {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id})

    }
})
router.get("/fullpageAd", fullpageAd)


router.get("/privacy", LoggedIN, (req,res) =>{
    res.render("privacyPolicy", {username:req.user.u_name})
})

router.get("/contact", LoggedIN, (req,res) =>{
    res.render("contact", {username:req.user.u_name})
})

router.post("/seller/profile/details/", SellerProfileDetails)

router.get("/profile/details/informative", LoggedIN, (req,res) => {
    res.json({userDetails:req.user})
})

router.get("/register",LoggedIN,  (req,res) =>{
    if(req.cookies._t && req.user){
        return res.redirect("/dashboard")
    }else{
    res.render("register")
    }
})
router.get("/login",LoggedIN, (req,res) =>{
    if(req.cookies._t && req.user){
        return res.redirect("/dashboard")
    }else{
    res.render("login")
    }
})

router.get("/l/:productTitle/:id",LoggedIN, opentToView, previewItem)
router.get("/details/:productTitle/:id", GetProductinfo)

router.post("/signup", signup)

router.get('/listings', LoggedIN, (req,res)=>{
    res.render("listings", {username:req.user.u_name})
})
router.get('/q/listings', LoggedIN, (req,res)=>{
    res.render("searchListings", {username:req.user.u_name})
})

router.post("/listings", listings)



router.post("/login", login)


router.get("/dashboard", LoggedIN, (req,res) => {
    if(req.cookies._t){
        res.render("dashboard", {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id})
    }else{
        res.render("login")
    }
})
router.get("/countMyListings", LoggedIN, countMyListings)

router.get("/profile", LoggedIN, (req,res) =>{
    if(req.cookies._t || (req.cookies._superID && req.cookies._ama)){
    res.render("profile",  {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id, facebook:req.user.fb, twitter:req.user.twitter, flickr:req.user.flickr, instagram:req.user.insta, youtube:req.user.ytube, vimeo:req.user.vimeo, behance:req.user.behance, linkedin: req.user.linkd, website:req.user.web})
}else{
    res.render("login")
}
})

router.get("/s/profile", AdminLoggedIn, (req,res) =>{
    if(req.cookies._t || (req.cookies._superID && req.cookies._ama)){
    res.render("profile",  {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id, facebook:req.user.fb, twitter:req.user.twitter, flickr:req.user.flickr, instagram:req.user.insta, youtube:req.user.ytube, vimeo:req.user.vimeo, behance:req.user.behance, linkedin: req.user.linkd, website:req.user.web})
}else{
    res.render("login")
}
})
// Save Profile Info 
router.post("/saveProfile/:field/:value", LoggedIN, saveProfile)
router.post("/updateProfileImage", LoggedIN, UpdateProfileImage)

router.get("/announcements",LoggedIN, AdminLoggedIn, (req,res)=>{
    if(req.cookies._t || req.cookies._ama){
        res.render("announcements",  {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id, facebook:req.user.fb, twitter:req.user.twitter, flickr:req.user.flickr, instagram:req.user.insta, youtube:req.user.ytube, vimeo:req.user.vimeo, behance:req.user.behance, linkedin: req.user.linkd, website:req.user.web})
    }else{
        res.render("login")
    }
})
router.post("/getAnnouncements", LoggedIN, getAnnouncements)
router.post("/getForums", LoggedIN, getforums)
router.post('/getForumComments', LoggedIN, getcomments)
router.post("/createComment", LoggedIN, CreateComments)
router.post("/createForum", LoggedIN, CreateForums)

router.get("/messages", LoggedIN, AdminLoggedIn,  (req,res) =>{
    if(req.cookies._t || req.cookies._ama){
    res.render("chats", {username: req.user.u_name, userId:req.user.id, chatWith:"N/A"})
    }else{
        res.render("login")
    }
})
router.get("/messages/:id", LoggedIN, (req,res) =>{
    if(req.cookies._t){
    res.render("chats", {username: req.user.u_name, userId:req.user.id, chatWith:req.params.id})
    }else{
        res.render("login")
    }
})
router.get('/myChats', LoggedIN, MyChats)
router.post("/chatHistory", chatHistory)

router.get('/bookmarks',LoggedIN, (req,res)=>{
    if(req.cookies._t){
    res.render('bookmarks', {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id})
    }else{
        res.render("login")
    }
})
router.post("/bookmarks", LoggedIN, bookmarks)
// Add To bookmarks 
router.post("/bookMarkItem", LoggedIN, addToBookMarks)
// Count Views 
router.get("/countViews/:id", LoggedIN, ViewsCount)
router.get("/categories", LoggedIN, categories)
router.post("/allCategories",  AllCategories)
router.post("/allSubCategories", AllSubCategories)
// render listings page 
router.get("/mylistings", LoggedIN,AdminLoggedIn, (req,res) =>{
    if(req.cookies._t || req.cookies._ama){

    res.render("mylistings", {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id})
    }else{
        res.render("login")
    }
}) 
// get Listings for user 
router.post("/userListings", userListings)
 
// Create ADs 
router.post("/postAd", LoggedIN, postAd)
router.post("/postBrandAdvert", LoggedIN, PostBrandAd)
router.post("/postFullpageAdvert", LoggedIN, postFullpageAd)

router.post("/updateAdvert", LoggedIN, UpdateAdvert)

// Item Actions 
router.get("/:do/item/:id", LoggedIN, CarryAction)
// Mark As Sold out 
router.post("/markAsSold", LoggedIN, markAsSold )
// DElete Item 
router.post("/deleteItem", LoggedIN, DeleteItem)

// find files to return via http
router.get("/api/uploads/find/:imageName", async (req,res) =>{
    const imageFile = req.params.imageName
    const parentDirectory = path.resolve(__dirname, '..');
    const DirectoryForImageUploads = parentDirectory+"/public/uploads/cover_images/listings/";
    const checkImageExists = async (imageFile) => {
        const localImagePath = DirectoryForImageUploads + imageFile;
        if (fs.existsSync(localImagePath)) {
            return res.json({imageExists:"yes"});
        }else{
            return res.json({status:404})
        }
    }
    await checkImageExists(imageFile)
})

router.get("/forum", LoggedIN, async (req,res) =>{
    if(req.cookies._t){
    res.render("forum", {username:req.user.u_name})
    }else{
        res.render("login")
    }
})

router.get("/map", LoggedIN, async (req,res) =>{
    res.render("map", {username:req.user.u_name})

    // res.render("comingSoon")
})
router.get("/mapDev", LoggedIN,  async(req,res) =>{
    res.render("map", {username:req.user.u_name})
})

router.get("/adintro", LoggedIN, async(req,res) =>{
    if(req.cookies._t && req.cookies._usid){
    res.render("adsIntro.ejs", {username:req.user.u_name})
    }else{
        res.render("login")
    }
})

router.get("/ad_packs_free",LoggedIN, async (req,res)=>{
    if(req.cookies._t && req.cookies._usid){
    res.render("freeAds", {username:req.user.username})
    }else{
        res.render("login")
    }
})

router.post("/ad_packs", LoggedIN, adsPacksPage)

router.post("/auction_item", async (req,res) =>{
    res.render("comingSoon")
})
router.get("/listingFiles/:id", listingFiles)
router.get("/auctions", LoggedIN, auctionsPage)
// Seller Profile 
router.get("/seller/:id", LoggedIN,async(req,res) =>{
    res.render("sellerProfile", {username:req.user.username, sellerId:req.params.id})
})
router.get("/sellerListings/:id", LoggedIN, SellerProfile)

router.get("/Logout", (req,res) => {
    res.clearCookie('_t')
    res.clearCookie("_usid")
    // res.clearCookie("paymentId")
    res.redirect("/")
})

router.get("/cat", LoggedIN, (req, res) =>{
    res.render("itemsInCat", {username:req.user.u_name})
})
router.post("/itemsInCat", LoggedIN, ItemsInCategory)
router.get("/createAd", LoggedIN, createAdPage)
router.post("/newsLetter/subscribe", SubscribeToNewsLetter)
router.post("/sponsoredAdverts", sponsoredAdverts)

// FOr Admin 
router.get("/superadmin", AdminLoggedIn, adminDashboard)
router.post("/adminlogin", adminLogin)
router.get("/s/forum", AdminLoggedIn, adminForum)
router.get("/email", AdminLoggedIn, EmailPage)
router.post("/mail/send", AdminLoggedIn, sendMail)
router.post("/mail/sent", AdminLoggedIn, sentMail)
router.get("/admin/countAdminListings", AdminLoggedIn, countAdminListings)
router.get("/s/announcements", AdminLoggedIn, AnnoucePage)
router.post("/CreateAnnouncements", AdminLoggedIn, CreateAnnoucements)
router.get("/s/all", AdminLoggedIn, AllListingsPage)
router.post("/allListings", AdminLoggedIn, AllListings)
router.post("/getTransactions", AdminLoggedIn, getTransactions)
router.get("/s/transactions", AdminLoggedIn, transactionsPage)
router.get("/s/fullpage", AdminLoggedIn, async (req,res) =>{
    if(req.cookies._superID && req.cookies._ama){
        res.render("adminFullPageAdvert", {username:req.user.u_name})
    }else{
        res.render("adminLogin")
    }
})
// Approve or Delete Items 
router.post("/s/:action/item/:id", AdminLoggedIn, adminActions)
router.get("/s/pending", AdminLoggedIn, pendingPage)
router.post("/pendingListings", AdminLoggedIn, Pending)
// router.get("/members-dev", AdminLoggedIn, Members)
router.get("/members", AdminLoggedIn, Members)
router.post("/allusers", AdminLoggedIn, AllUsers)
router.get("/s/subscribers", AdminLoggedIn, subscribersPage)
router.post("/subscribers", AdminLoggedIn, subscribers)
router.get("/s/brands", AdminLoggedIn, BrandAdsPage)
router.post("/allBrands", AdminLoggedIn, AllBrandAds)
router.post("/s/:action/brand/:id", AdminLoggedIn, BrandActions)
router.get("/brand/:title/:id", LoggedIN, brandPreviewPage)
router.get("/details/brand/:productTitle/:id", GetBrandInfo)
router.get("/verify", verifyAccount)
router.post("/stripe/key", LoggedIN, getKeys)
router.post("/s/:action/fullpage/:id", AdminLoggedIn, fullpageActions)
router.get("/paid/:itemId", LoggedIN, updateItem)

router.post("/create-payment-intent", LoggedIN, paymentintent)
router.post("/charge", LoggedIN, charge)
router.get("/post/advert", LoggedIN, paidAdvertPage)
router.get("/post/advert/slideshow", LoggedIN, slideshowAdvertPage)
router.get("/post/advert/sponsored", LoggedIN, sponsoredAdvertPage)
router.get("/post/advert/fullpage", LoggedIN, FullPageAdvertPage)
router.get("/post/advert/static", LoggedIN, StaticAdvertPage)
router.post("/staticAdverts", getStaticAds)
router.get("/SlideShowAdverts", getSlideShowAdverts)
router.get("/forgot-password", (req,res) =>{
    res.render("forgotPassword")
})
router.get("/verifyCode", async (req,res) =>{
    if(req.cookies._sessionCode && req.cookies._user){
        res.render("createPassword")
    }else if(req.cookies._user && !req.cookies._sessionCode){
        res.render("verifyCode")
    }else{
        res.render("forgotPassword")
    }
})


router.post("/forgot-password", forgotPassword)

router.post("/verify-code", verifyCode)
router.post("/create-password", createPassword)


router.get("/superadmin/logout", (req,res) => {
    res.clearCookie('_ama')
    res.clearCookie("_superID")
    res.clearCookie("_usid")
    res.redirect("/superadmin")
})
router.get("*", (req, res)=> { 
    res.redirect('/')
})
module.exports = router