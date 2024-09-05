const subscribersPage = async (req,res) =>{
    if(req.cookies._superID && req.cookies._ama){
        res.render("adminSubscribers", {username:req.user.u_name})
    }else{
        res.render("adminLogin")
    }
}

module.exports = subscribersPage