const Members = async (req,res) =>{
    if(req.cookies._ama){
    res.render("membersList", {username:req.user.u_name})
    }else{
        return req.json({error:"NotLoggedIn"})
    }
}


module.exports = Members