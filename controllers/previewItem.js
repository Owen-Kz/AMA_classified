const previewItem =  async (req,res) =>{
   
    res.render("preview.ejs", {title:req.params.productTitle,email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id})
  
}

module.exports = previewItem