const adminDashboard = async (req,res) =>{
   
        if(req.cookies._ama && req.cookies._superID){
            res.render("adminDashboard", {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id})
        }else{
            res.render("adminLogin")
        }
    
}

module.exports = adminDashboard