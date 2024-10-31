const referralsPage = async (req,res) =>{
    if(req.cookies._t){

    res.render("referrals", {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id, referral_id: req.user.referral_code})
    }else{
        res.render("login")
    }
}

module.exports = referralsPage