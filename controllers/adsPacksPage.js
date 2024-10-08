const adsPacksPage = async (req,res) =>{
    const inventoryToken = "inventory_ad"
    const sportsToken = "sports_ad"
    const auctionToken = "auction_ad"
    const businessToken = "business_ad"
    const brandsToken = "brand_ad"
    let package = "normal_package"
    const {_token, amount1, amount2} = req.body


    if(req.cookies._t){
        if(_token === inventoryToken){
            res.render("inventoryAd", {amount_one:amount1, amount_two:amount2,token:inventoryToken, adPack:package, username:req.user.u_name})
        }else if(_token === sportsToken){
            res.render("inventoryAd", {amount_one:amount1, amount_two:amount2,token:sportsToken, adPack:package,username:req.user.u_name})
        }else if(_token === auctionToken){
            res.render("inventoryAd", {amount_one:amount1, amount_two:amount2,token:auctionToken, adPack:package, username:req.user.u_name})
        }else if(_token === businessToken){
            res.render("inventoryAd", {amount_one:amount1, amount_two:amount2,token:businessToken, adPack:package, username:req.user.u_name})
        }else if(_token === brandsToken){
            
            res.render("brandAd", {
            sponsored_3months:"5.00",
            sponsored_6months:"9.00",
            slideshow_3months:"10.00",
            slideshow_6months:"18.00",
            static_3months:"20.00",
            static_6months:"39.00",
            fullpage_3months:"45.00",
            fullpage_6months:"80.00",
            token:brandsToken, adPack:package, username:req.user.u_name})
        }
        else{
            res.render("comingSoon")
        }

    }else{
        res.render("login")
    }
}


module.exports = adsPacksPage