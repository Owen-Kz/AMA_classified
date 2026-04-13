const categories = async (req,res)=>{
    
    if(req.user && req.cookies._t){
        res.render("categories", {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id})
    }else{
        res.render("categories", {username:req.user.u_name})
    }
}


module.exports = categories