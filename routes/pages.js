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
const getReferrals = require("../controllers/utils/getReferrals");
const referralsPage = require("../controllers/pages/referralsPage");
const SaveAnalytics = require("../controllers/analytics/saveAnalytics");
const getAnalytics = require("../controllers/analytics/getAnalytics");
const analyticsPage = require("../controllers/admin/analyticsPage");
const adminPreview = require("../controllers/admin/adminPreview");
const checkFreeAds = require("../controllers/adsManagement/checkFreeAds");
const siteMap = require("../controllers/services/sitemap");
const fundWallet = require("../controllers/wallet/fundWallet");
// const checkPaidAds = require("../controllers/adsManagement/checkPaidAds");

const router = express.Router();

router.use(express.json());

// Payment success page (handles both wallet and listing)
router.get('/payment/success', (req, res) => {
    const { 
        session_id, 
        listing_id, 
        title, 
        amount, 
        payment_type,
        new_balance,
        transaction_id 
    } = req.query;
    
    // Determine payment type
    let paymentType = payment_type || 'general';
    
    // If listing_id exists, it's a listing payment
    if (listing_id) {
        paymentType = 'listing';
    }
    // If new_balance exists and no listing_id, it's a wallet top-up
    else if (new_balance) {
        paymentType = 'wallet';
    }
    
    const currentDate = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    res.render('paymentSuccess', {
        paymentType: paymentType,
        transactionId: transaction_id || session_id,
        listingId: listing_id,
        title: title ? decodeURIComponent(title) : 'Your Transaction',
        amount: amount || '0.00',
        newBalance: new_balance || '0.00',
        date: currentDate
    });
});

// Payment cancelled page
router.get('/payment/cancelled', (req, res) => {
    const { 
        listing_id, 
        title, 
        amount, 
        payment_type,
        transaction_id 
    } = req.query;
    
    // Determine payment type
    let paymentType = payment_type || 'general';
    
    if (listing_id) {
        paymentType = 'listing';
    }
    
    res.render('paymentCancelled', {
        paymentType: paymentType,
        transactionId: transaction_id,
        listingId: listing_id,
        title: title ? decodeURIComponent(title) : null,
        amount: amount || '0.00'
    });
});

//LISTING Payment success page
router.get('/listing-payment/success', (req, res) => {
    const { session_id, listing_id, title, amount } = req.query;
    res.render('listingPaymentSuccess', {
        listingId: listing_id,
        title: title || 'Your Listing',
        amount: amount || '0.00',
        sessionId: session_id
    });
});

//LISTING Payment cancelled page
router.get('/listing-payment/cancelled', (req, res) => {
    const { listing_id, title, amount } = req.query;
    res.render('listingPaymentCancelled', {
        listingId: listing_id,
        title: title || 'Your Listing',
        amount: amount || '0.00'
    });
});

// router.get("/", LoggedIN, (req,res) =>{
//     if(req.cookies._t){
//         res.render("home", {email:req.user.email, username:req.user.u_name, current_rates:req.current_rates, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id})
//     }else{
//     res.render("home", {email:req.user.email, username:req.user.u_name, current_rates:req.current_rates, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id})

//     }
// })
// router.get("/fullpageAd", fullpageAd)


router.post("/seller/profile/details/", SellerProfileDetails)



router.get("/register",LoggedIN,  (req,res) =>{
    if(req.cookies._t && req.user){
        return res.redirect("/dashboard")
    }else{
        let referralId = ""
        if(req.query.ref){
            referralId = req.query.ref
        }
    res.render("register", {refID:referralId})
    }
})
router.get("/login",LoggedIN, (req,res) =>{
    if(req.cookies._t && req.user){
        return res.redirect("/dashboard")
    }else{
    res.render("login")
    }
})

router.get("/l/:id",LoggedIN, opentToView, previewItem)
router.get("/previewItemAdmin/:id",LoggedIN, adminPreview)

router.get("/details/:id", GetProductinfo)
router.get("/details/:productTitle/:id", GetProductinfo)


router.post("/signup", signup)

router.get('/listings', LoggedIN, (req,res)=>{
    res.render("listings", {username:req.user.u_name, current_rates:req.current_rates})
})
router.get('/q/listings', LoggedIN, (req,res)=>{
    res.render("searchListings", {username:req.user.u_name, current_rates:req.current_rates})
})



router.get("/s/profile", AdminLoggedIn, (req,res) =>{
    if(req.cookies._t || (req.cookies._superID && req.cookies._ama)){
    res.render("profile",  {email:req.user.email, username:req.user.u_name, current_rates:req.current_rates, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id, facebook:req.user.fb, twitter:req.user.twitter, flickr:req.user.flickr, instagram:req.user.insta, youtube:req.user.ytube, vimeo:req.user.vimeo, behance:req.user.behance, linkedin: req.user.linkd, website:req.user.web})
}else{
    res.render("login")
}
})

router.get("/announcements",LoggedIN, AdminLoggedIn, (req,res)=>{
    if(req.cookies._t || req.cookies._ama){
        res.render("announcements",  {email:req.user.email, username:req.user.u_name, current_rates:req.current_rates, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id, facebook:req.user.fb, twitter:req.user.twitter, flickr:req.user.flickr, instagram:req.user.insta, youtube:req.user.ytube, vimeo:req.user.vimeo, behance:req.user.behance, linkedin: req.user.linkd, website:req.user.web})
    }else{
        res.render("login")
    }
})

router.get("/category_result", async (req,res) =>{
    if(req.query.category){
        res.redirect(`/cat?c=${req.query.category}`)
    }else{
        res.redirect("/")
    }
})

router.get("/messages", LoggedIN, AdminLoggedIn,  (req,res) =>{
    if(req.cookies._t || req.cookies._ama){
    res.render("chats", {username: req.user.u_name, current_rates:req.current_rates, userId:req.user.id, chatWith:"N/A"})
    }else{
        res.render("login")
    }
})


router.post("/bookmarks", LoggedIN, bookmarks)
// Add To bookmarks 
router.post("/bookMarkItem", LoggedIN, addToBookMarks)
// Count Views 
// router.get("/countViews/:id", LoggedIN, ViewsCount)
// router.get("/categories", LoggedIN, categories)
// router.post("/allCategories",  AllCategories)
// router.post("/allSubCategories", AllSubCategories)
// render listings page 
router.get("/mylistings", LoggedIN,AdminLoggedIn, (req,res) =>{
    if(req.cookies._t || req.cookies._ama){

    res.render("mylistings", {email:req.user.email, username:req.user.u_name, current_rates:req.current_rates, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id})
    }else{
        res.render("login")
    }
}) 


// get Listings for user 
router.post("/userListings", userListings)
 

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


router.get("/adintro", LoggedIN, async(req,res) =>{
   res.redirect("https://amaslink.com/adintro")
})

router.get("/ad_packs_free",LoggedIN, async (req,res)=>{
    res.redirect("https://amaslink.com/adintro")

})

// router.post("/ad_packs", LoggedIN, adsPacksPage)

router.post("/auctions", async (req,res) =>{
      res.redirect("https://amaslink.com/auctions")

})
router.get("/listingFiles/:id", listingFiles)
// router.get("/auctions", LoggedIN, auctionsPage)
// // Seller Profile 
// router.get("/seller/:id", LoggedIN,async(req,res) =>{
//     res.render("sellerProfile", {username:req.user.username, sellerId:req.params.id})
// })
// router.get("/sellerListings/:id", LoggedIN, SellerProfile)

router.get("/Logout", (req,res) => {
    res.clearCookie('_t')
    res.clearCookie("_usid")
    // res.clearCookie("paymentId")
    res.redirect("/")
})

router.get("/cat", LoggedIN, (req, res) =>{
    res.render("itemsInCat", {username:req.user.u_name, current_rates:req.current_rates})
})
// router.post("/itemsInCat", LoggedIN, ItemsInCategory)
// router.get("/createAd", LoggedIN, createAdPage)

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
        res.render("adminFullPageAdvert", {username:req.user.u_name, current_rates:req.current_rates})
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
router.get("/brand/:id", LoggedIN, brandPreviewPage)
router.get("/details/brand/:id", GetBrandInfo)
router.get("/verify", verifyAccount)
router.post("/stripe/key", LoggedIN, getKeys)
router.post("/s/:action/fullpage/:id", AdminLoggedIn, fullpageActions)
router.get("/paid/:itemId", LoggedIN, updateItem)

// router.post("/create-payment-intent", LoggedIN, paymentintent)
// router.post("/charge", LoggedIN, charge)
// router.get("/post/advert", LoggedIN, paidAdvertPage)
// router.get("/post/advert/slideshow", LoggedIN, slideshowAdvertPage)
// router.get("/post/advert/sponsored", LoggedIN, sponsoredAdvertPage)
// router.get("/post/advert/fullpage", LoggedIN, FullPageAdvertPage)
// router.get("/post/advert/static", LoggedIN, StaticAdvertPage)
// router.post("/staticAdverts", getStaticAds)
// router.get("/SlideShowAdverts", getSlideShowAdverts)
// router.get("/forgot-password", (req,res) =>{
//     res.render("forgotPassword")
// })
// router.get("/verifyCode", async (req,res) =>{
//     if(req.cookies._sessionCode && req.cookies._user){
//         res.render("createPassword")
//     }else if(req.cookies._user && !req.cookies._sessionCode){
//         res.render("verifyCode")
//     }else{
//         res.render("forgotPassword")
//     }
// })


// router.post("/getCountryData", LoggedIN, async (req,res) =>{
    
//     if(req.user){
//         return res.json({country:req.current_rates})
//     }else{
//         return null
//     }
// })

// router.post("/forgot-password", forgotPassword)

// router.post("/verify-code", verifyCode)
// router.post("/create-password", createPassword)

// Get Referrals 
// router.post("/getReferrals", LoggedIN, getReferrals)

// External Advert Analytics
router.get("/promo/:source", SaveAnalytics)
router.post("/s/getAnalytics", AdminLoggedIn, getAnalytics)
router.get("/s/analytics", AdminLoggedIn, analyticsPage)
router.post("/api/fundwallet", LoggedIN, fundWallet)

router.get("/superadmin/logout", (req,res) => {
    res.clearCookie('_ama')
    res.clearCookie("_superID")
    res.clearCookie("_usid")
    res.redirect("/superadmin")
})


router.get("/mobi", (req,res) =>{
    res.render("mobile-navbar")
})

router.get('/sitemap.xml', siteMap)


router.get("*", (req, res)=> { 
    res.redirect('/')
})
module.exports = router
