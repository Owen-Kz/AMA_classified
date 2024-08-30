const createAdPage = async (req,res) =>{
    if(req.cookies._t && req.cookies._usid){
        res.render("postItem", {username:req.user.u_name})
    }else{
        res.render("login")
    }
}


module.exports = createAdPage