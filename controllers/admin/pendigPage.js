const pendingPage = async (req,res) =>{
    if(req.cookies._ama){
        res.render("adminPendingListings", {username:req.user.username})
    }
}

module.exports = pendingPage