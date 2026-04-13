const AnnoucePage = async (req,res) =>{
    if(req.cookies._ama && req.cookies._superID){
        res.render("adminAnnoucements", {username:req.user.u_name})
    }else{
        res.render("adminLogin")
    }
}


module.exports = AnnoucePage