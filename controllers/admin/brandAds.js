const BrandAdsPage = async(req,res) =>{
    if(req.cookies._ama && req.cookies._superID){
        res.render("adminBrandAds", {username:req.user.u_name})
    }else{
        res.render("adminLogin")
    }
}

module.exports = BrandAdsPage