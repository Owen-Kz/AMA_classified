const analyticsPage = async (req,res) =>{
    try{
    if(req.cookies._ama && req.cookies._superID){
        res.render("analytics", {username:req.user.u_name})
    }else{
        res.render("adminLogin")
    }
}catch(error){
    return res.json({error:error})
}
}

module.exports = analyticsPage