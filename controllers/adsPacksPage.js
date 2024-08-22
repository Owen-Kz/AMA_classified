const adsPacksPage = async (req,res) =>{
    const inventoryToken = "inventory_ad"
    const sportsToken = "sports_ad"
    const auctionToken = "auction_ad"
    const businessToken = "business_ad"
    const brandsToken = "brand_ad"
    const {_token, amount1, amount2} = req.body
    if(req.cookies._t){
        if(_token === inventoryToken){
            res.render("inventoryAd", {amount_one:amount1, amount_two:amount2, username:req.user.username})
        }else{
            res.render("comingSoon")
        }
    console.log(req.body)
    }else{
        res.render("login")
    }
}


module.exports = adsPacksPage