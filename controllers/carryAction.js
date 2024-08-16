const CarryAction = async (req,res) =>{
    if(req.cookies._t){
        const action = req.params.do 
        const itemId = req.params.id 
        
        if(action === "edit"){
        res.render("editItem", {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id})
        }else if(action === "boost"){
            res.render("boost", {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id})

        }else if(action === "delete"){
            res.render("deleteItem", {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id})

        }else if(actoin === "soldout"){
            res.render("soldout", {email:req.user.email, username:req.user.u_name, firstname:req.user.name, lastname:req.user.l_name, country:req.user.country, phonenumber: req.user.phone, profilePhoto:req.user.pp, user_id:req.user.id})
        }

    }else{
        res.redirect("/login")
    }
}


module.exports = CarryAction