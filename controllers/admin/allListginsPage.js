const AllListingsPage = async(req,res) =>{
    if(req.cookies._ama && req.cookies._superID){
        res.render("adminAllListings", {username:req.user.username})
    }else{
        res.render("adminLogin")
    }
}

module.exports = AllListingsPage