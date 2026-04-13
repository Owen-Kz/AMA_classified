const brandPreviewPage =  async (req,res) =>{

    if(req.params.id){
    res.render("previewBrandAd.ejs", {title:req.params.title,email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id})
    }else{
        res.render("home", {username:req.user.u_name})
    }
  
}

module.exports = brandPreviewPage