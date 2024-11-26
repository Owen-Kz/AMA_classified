const previewItem =  async (req,res) =>{
    console.log("requested preview")
   try{
    if(req.user){
    res.render("preview.ejs", {title:req.params.productTitle, email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id})
    }else{
        res.render("login")
    }
   }catch(error){
    console.log(error)
    res.json({error:error})
   }
  
}

module.exports = previewItem