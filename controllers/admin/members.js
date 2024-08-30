const Members = async (req,res) =>{
    if(req.cookies._ama){
    res.render("membersList", {username:req.user.u_name})
    }else{
        res.render("adminLogin")
        // return res.json({error:"NotLoggedIn"})
    }
}


module.exports = Members